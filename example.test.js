const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculateTotal } = require('./example');
test('normal, empty, zero and credit totals', () => {
  assert.equal(calculateTotal([]), 0);
  assert.equal(calculateTotal([{price:10},{price:20},{price:0},{price:-5}]),25);
});
test('decimal precision uses a numerical tolerance', () => {
  assert.ok(Math.abs(calculateTotal([{price:0.1},{price:0.2}])-0.3) < 1e-12);
});
test('rejects malformed arrays and unsafe prices', () => {
  for (const input of [null,undefined,{},42,'items']) assert.throws(()=>calculateTotal(input),TypeError);
  for (const item of [null,{}, {price:'10'}, {price:true}, {price:NaN}, {price:Infinity}]) {
    assert.throws(()=>calculateTotal([item]),TypeError);
  }
});
test('does not mutate callers', () => {
  const items=Object.freeze([Object.freeze({price:10,name:'example'})]);
  assert.equal(calculateTotal(items),10);
});
