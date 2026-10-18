const fs = require('fs');

const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');

const funcs = [
  'function U(',  'function W(',
  'function G(',  'function K(',
  'function q(',  'function se(',
  'function J(',  'function ce(',
  'function le(', 'function Y(',
  'function ue(', 'function X(',
  'function Z(',  'function de(',
  'function Q(',  'function fe(',
  'function pe(', 'function me(',
  'function he(', 'function ge(',
  'function $('
];

funcs.forEach((fn, i) => {
  const start = routesJs.indexOf(fn);
  const nextStart = i < funcs.length - 1 ? routesJs.indexOf(funcs[i + 1]) : routesJs.length;
  const chunk = routesJs.slice(start, Math.min(start + 400, nextStart));
  console.log(`=== ${fn} ===`);
  console.log(chunk.replace(/\n+/g, ' ').slice(0, 300));
  console.log('...\n');
});
