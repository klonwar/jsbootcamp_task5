const chalk = require(`chalk`);
const jsonfy = (s) => (typeof s === `object`) ? JSON.stringify(s) : s;

const log = (s) => {
  console.log(jsonfy(s));
};
const warn = (s) => {
  console.warn(`-x ${jsonfy(s)}`);
};
const err = (s) => {
  console.error(`-X ${jsonfy(s)}`);
};
const succ = (s) => {
  console.log(`-V ${jsonfy(s)}`);
};
const inf = (s) => {
  console.log(`--> `+jsonfy(s));
};
const fillSucc = (s) => {
  console.log(`-V ${jsonfy(s)} `);
};


export {
  log,
  warn,
  err,
  succ,
  inf,
  fillSucc
};
