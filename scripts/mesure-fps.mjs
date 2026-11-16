// Mesure des images par seconde sur tout le parcours (#19, #57), sans dépendance : Chrome piloté par CDP.
// Pour chaque étape : on y va (transition de caméra comprise), on clique sur le bouton d'action (minage, course…),
// et on compte les images pendant 5 s. Le processeur peut être ralenti (--cpu 6) pour simuler un poste faible.
//   node scripts/mesure-fps.mjs [url] [--cpu 1] [--gpu hard|soft] [--size 1600x900] [--dpr 1] [--visible]
// Par défaut : la démo publiée, carte graphique (hard), écran 1600×900.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const url = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? 'https://dyzlek.github.io/r507-blockchain-3d/';
const cpu = Number(opt('cpu', 1));
const gpu = opt('gpu', 'hard');
const [W, H] = opt('size', '1600x900').split('x').map(Number);
const dpr = Number(opt('dpr', 1));
const PER_STEP = 5000;

const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find((p) => fs.existsSync(p));
if (!chrome) throw new Error('Chrome introuvable');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'fps-'));
const port = 9300 + Math.floor(Math.random() * 500);
const flags = [
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${W},${H}`, '--no-first-run',
  // Sans ces options, Chrome ralentit les pages qu'il croit cachées et fausse la mesure.
  '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
  ...(args.includes('--visible') ? [] : ['--headless=new']),
  ...(gpu === 'soft' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : ['--enable-gpu', '--ignore-gpu-blocklist']),
  'about:blank',
];
const proc = spawn(chrome, flags, { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  target = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).then((l) => l.find((t) => t.type === 'page')).catch(() => null);
}
if (!target) { proc.kill(); throw new Error('Chrome ne répond pas'); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); pending.get(m.id)?.(m); pending.delete(m.id); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: dpr, mobile: false });
await send('Emulation.setFocusEmulationEnabled', { enabled: true });
await send('Page.enable');
await send('Page.navigate', { url: `${url}?etape=1` });
for (let i = 0; i < 60 && !(await evaluate('Boolean(window.app)')); i++) await sleep(500);
const renderer = await evaluate(`(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); })()`);
if (cpu > 1) await send('Emulation.setCPUThrottlingRate', { rate: cpu });
await sleep(2000);

// Compte les images d'une étape : durée de chaque image, moyenne, pire seconde, part des images trop lentes (> 33 ms).
const measure = (step) => `new Promise((resolve) => {
  app.goTo(${step});
  setTimeout(() => document.querySelector('#inspect:not([hidden]):not(:disabled)')?.click(), 800);
  const frames = []; let last = performance.now(); const start = last;
  const tick = (t) => { frames.push(t - last); last = t; if (t - start < ${PER_STEP}) requestAnimationFrame(tick); else done(); };
  requestAnimationFrame(tick);
  function done() {
    frames.shift();
    const total = frames.reduce((a, b) => a + b, 0);
    let worst = Infinity;
    for (let i = 0, acc = 0, n = 0, j = 0; i < frames.length; i++) {
      acc += frames[i]; n++;
      while (acc > 1000 && j < i) { acc -= frames[j++]; n--; }
      if (acc >= 900) worst = Math.min(worst, n * 1000 / acc);
    }
    resolve({ avg: frames.length * 1000 / total, worst: Number.isFinite(worst) ? worst : null, slow: frames.filter((f) => f > 33.4).length / frames.length, max: Math.max(...frames) });
  }
})`;

const rows = [];
for (let step = 0; step < 9; step++) rows.push({ step: step + 1, ...(await evaluate(measure(step))) });
ws.close();
proc.kill();
setTimeout(() => fs.rmSync(profile, { recursive: true, force: true }), 500);

const f = (n) => (Number.isFinite(n) ? n.toFixed(0) : "—").padStart(4);
console.log(`URL : ${url}\nRendu : ${renderer} (${gpu === 'soft' ? 'logiciel' : 'carte graphique'}) · processeur ralenti ×${cpu} · ${W}×${H} ×${dpr}`);
console.log('Étape | moyenne | pire seconde | images > 33 ms | pire image');
for (const r of rows) console.log(`  ${r.step}   |  ${f(r.avg)}   |    ${f(r.worst)}      |      ${(r.slow * 100).toFixed(1).padStart(4)} %   | ${f(r.max)} ms`);
const all = rows.map((r) => r.worst);
console.log(`Minimum sur le parcours (pire seconde) : ${Math.min(...all).toFixed(0)} images/s`);
