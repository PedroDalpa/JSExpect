// Fibonacci sequence generator: next number is the
// sum of the two preceding ones

const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const assert = require('assert');
const sinon = createSandbox();

const fibonacci = new Fibonacci();
(async () => {
  {
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // Number of sequences to generate
    // [0] input = 5, current = 0, next = 1, result 0
    // [1] input = 4, current = 1, next = 1, result 1
    // [2] input = 3, current = 1, next = 2, result 1
    // [3] input = 2, current = 2, next = 3, result 2
    // [4] input = 1, current = 3, next = 5, result 3
    // [5] input = 0 -> stop the generator

    for (const _ of fibonacci.execute(5)) {
    }
    const expectedCallCount = 6;

    assert.strictEqual(spy.callCount, expectedCallCount);
  }
  {
    const result = [...fibonacci.execute(5)];

    assert.deepStrictEqual(result, [0, 1, 1, 2, 3]);
  }
})();
