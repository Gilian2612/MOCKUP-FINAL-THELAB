const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PY = path.join(process.env.USERPROFILE, '.cache', 'opencode-senses', 'venv', 'Scripts', 'python.exe');
const RT = path.join(
  process.env.USERPROFILE,
  '.cache', 'opencode', 'npm', 'opencode-senses@latest', '1792469651736',
  'node_modules', 'opencode-senses', 'dist', 'python', 'runtime.py'
);

const QUESTION = process.argv[2] || 'Review this page as a UX/UI designer. Is the text legible? Is anything overlapping, cut off, misaligned, or too close to the edges? Is the hierarchy clear?';

const files = process.argv.slice(3);
if (!files.length) files.push(...fs.readdirSync('C:\\Users\\Mono').filter(f => f.startsWith('r-') && f.endsWith('.png')).map(f => 'C:\\Users\\Mono\\' + f));

const reqs = [{ id: 1, method: 'load', params: { model: 'moondream2' } }];
let id = 2;
for (const f of files) {
  reqs.push({
    id: id++,
    method: 'query',
    params: { source: { type: 'path', path: f }, question: QUESTION }
  });
}

const res = spawnSync(PY, [RT], {
  input: reqs.map(r => JSON.stringify(r)).join('\n') + '\n',
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});

for (const line of (res.stdout || '').split('\n')) {
  if (!line.trim().startsWith('{')) continue;
  let msg;
  try { msg = JSON.parse(line); } catch { continue; }
  if (msg.id === 1) { console.log('model loaded:', msg.result && msg.result.loaded); continue; }
  const file = files[msg.id - 2];
  console.log('\n=== ' + path.basename(file) + ' ===');
  console.log(msg.result ? msg.result.answer : JSON.stringify(msg.error));
}
if (res.stderr) {
  const err = res.stderr.split('\n').filter(l => l && !/Warning|MOONDREAM_API_KEY|unauthenticated/i.test(l));
  if (err.length) console.log('\n[stderr]', err.join('\n').slice(0, 600));
}
