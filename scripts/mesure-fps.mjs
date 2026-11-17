// Mesure des images par seconde sur tout le parcours (#19, #57), sans dépendance : Chrome piloté par CDP.
// Pour chaque étape : on y va (transition de caméra comprise), on clique sur le bouton d'action (minage, course…),
// et on compte les images pendant 5 s. Le processeur peut être ralenti (--cpu 6) pour simuler un poste faible.
//   node scripts/mesure-fps.mjs [url] [--browser chrome|edge|firefox] [--cpu 1] [--gpu hard|high|soft] [--size 1600x900] [--dpr 1] [--visible]
// Par défaut : la démo publiée dans Chrome, carte graphique choisie par Windows (hard, souvent l'intégrée sur un
// portable), écran 1600×900. `high` force la carte dédiée (portable à deux cartes), `soft` le rendu logiciel.
// Edge se pilote comme Chrome (CDP). Firefox se pilote en WebDriver BiDi : pas de ralentissement du processeur
// (--cpu ignoré) ni de choix de carte (c'est Windows qui choisit, réglable dans Paramètres > Affichage > Graphiques).
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const url = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? 'https://dyzlek.github.io/r507-blockchain-3d/';
const cpu = Number(opt('cpu', 1));
const gpu = opt('gpu', 'hard');
const browser = opt('browser', 'chrome');
const [W, H] = opt('size', '1600x900').split('x').map(Number);
const dpr = Number(opt('dpr', 1));
const PER_STEP = 5000;

const PATHS = {
  chrome: ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
  edge: ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', '/usr/bin/microsoft-edge', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'],
  firefox: ['C:/Program Files/Mozilla Firefox/firefox.exe', '/usr/bin/firefox', '/Applications/Firefox.app/Contents/MacOS/firefox'],
};
const exe = (PATHS[browser] ?? []).find((p) => fs.existsSync(p));
if (!exe) throw new Error(`Navigateur introuvable : ${browser}`);
const firefox = browser === 'firefox';
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'fps-'));
const port = 9300 + Math.floor(Math.random() * 500);
const visible = args.includes('--visible');
const flags = firefox
  ? [`--remote-debugging-port=${port}`, '--profile', profile, '--no-remote', `--width=${W}`, `--height=${H}`, ...(visible ? [] : ['--headless']), 'about:blank']
  : [
      `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${W},${H}`, '--no-first-run',
      // Sans ces options, Chrome ralentit les pages qu'il croit cachées et fausse la mesure.
      '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
      ...(visible ? [] : ['--headless=new']),
      ...(gpu === 'soft' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : ['--enable-gpu', '--ignore-gpu-blocklist']),
      ...(gpu === 'high' ? ['--force_high_performance_gpu'] : []),
      'about:blank',
    ];
if (firefox) {
  // Profil de mesure : pas de ralentissement des pages en arrière-plan, et le vrai nom de la carte graphique
  // (Firefox l'arrondit par défaut à un modèle générique).
  const prefs = { 'dom.min_background_timeout_value': 0, 'dom.timeout.enable_budget_timer_throttling': false, 'webgl.sanitize-unmasked-renderer': false };
  fs.writeFileSync(path.join(profile, 'user.js'), Object.entries(prefs).map(([k, v]) => `user_pref("${k}", ${v});`).join('\n'));
}
console.log(`Mesure en cours (environ 1 min, ne pas toucher à la fenêtre) : ${url} · ${browser}${firefox ? '' : ` · processeur ralenti ×${cpu}`}`);
const proc = spawn(exe, flags, { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Ferme tout le navigateur : sous Windows, tuer le processus principal laisse tourner ses processus enfants
// (rendu, carte graphique), qui continuent à dessiner la scène et faussent les mesures suivantes.
const killBrowser = () => {
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
  else proc.kill();
};
const quit = () => { try { ws?.close(); } catch {} killBrowser(); };

// Connexion : CDP pour Chrome et Edge, WebDriver BiDi pour Firefox. `send` et `evaluate` cachent la différence.
let ws;
let wsUrl;
for (let i = 0; i < 75 && !wsUrl; i++) {
  await sleep(200);
  if (firefox) {
    // Firefox n'a pas de point d'entrée HTTP : on tente directement la connexion BiDi.
    const probe = await new Promise((r) => {
      const t = new WebSocket(`ws://127.0.0.1:${port}/session`);
      t.addEventListener('open', () => r(t));
      t.addEventListener('error', () => r(null));
    });
    if (probe) { ws = probe; wsUrl = probe.url; }
  } else {
    wsUrl = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).then((l) => l.find((t) => t.type === 'page')?.webSocketDebuggerUrl).catch(() => null);
  }
}
if (!wsUrl) { killBrowser(); throw new Error(`${browser} ne répond pas`); }
if (!ws) {
  ws = new WebSocket(wsUrl);
  await new Promise((r, j) => { ws.addEventListener('open', r); ws.addEventListener('error', j); });
}
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); pending.get(m.id)?.(m); pending.delete(m.id); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
let context;
// Les valeurs reviennent en JSON pour avoir le même format avec les deux protocoles.
const evaluate = async (expression) => {
  const wrapped = `Promise.resolve(${expression}).then((v) => JSON.stringify(v ?? null))`;
  const m = firefox
    ? await send('script.evaluate', { expression: wrapped, target: { context }, awaitPromise: true, resultOwnership: 'none' })
    : await send('Runtime.evaluate', { expression: wrapped, awaitPromise: true, returnByValue: true });
  const text = firefox ? m.result?.result?.value : m.result?.result?.value;
  return typeof text === 'string' ? JSON.parse(text) : undefined;
};

if (firefox) {
  await send('session.new', { capabilities: {} });
  context = (await send('browsingContext.getTree', {})).result.contexts[0].context;
  await send('browsingContext.setViewport', { context, viewport: { width: W, height: H }, devicePixelRatio: dpr });
  await send('browsingContext.navigate', { context, url: `${url}?etape=1`, wait: 'complete' });
} else {
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: dpr, mobile: false });
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  await send('Page.enable');
  await send('Page.navigate', { url: `${url}?etape=1` });
}
for (let i = 0; i < 60 && !(await evaluate('Boolean(window.app)')); i++) await sleep(500);
const renderer = await evaluate(`(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); })()`);
if (cpu > 1 && !firefox) await send('Emulation.setCPUThrottlingRate', { rate: cpu });
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
for (let step = 0; step < 9; step++) {
  console.log(`  étape ${step + 1} / 9…`);
  rows.push({ step: step + 1, ...(await evaluate(measure(step))) });
}
quit();
// Le navigateur peut garder le profil quelques instants après sa fermeture : on réessaie, sans faire échouer la mesure.
setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 }); } catch {} }, 500);

const f = (n) => (Number.isFinite(n) ? n.toFixed(0) : "—").padStart(4);
const mode = firefox ? 'carte choisie par Windows' : `${{ soft: 'logiciel', high: 'carte dédiée forcée' }[gpu] ?? 'carte graphique'}, processeur ralenti ×${cpu}`;
console.log(`URL : ${url}\nNavigateur : ${browser} · rendu : ${renderer} (${mode}) · ${W}×${H} ×${dpr}`);
console.log('Étape | moyenne | pire seconde | images > 33 ms | pire image');
for (const r of rows) console.log(`  ${r.step}   |  ${f(r.avg)}   |    ${f(r.worst)}      |      ${(r.slow * 100).toFixed(1).padStart(4)} %   | ${f(r.max)} ms`);
const all = rows.map((r) => r.worst);
console.log(`Minimum sur le parcours (pire seconde) : ${Math.min(...all).toFixed(0)} images/s`);
