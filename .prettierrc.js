// @ts-nocheck
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  printWidth: 200,
  trailingComma: 'none',
  arrowParens: 'avoid'
};
