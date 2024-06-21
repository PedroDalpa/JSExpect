class Fibonacci {
  *execute(input, current = 0, next = 1) {
    // All sequences is generated and stop
    if (input === 0) {
      return;
    }

    yield current;

    // Delega a funcao mas nao retorna valor
    yield* this.execute(input - 1, next, current + next);
  }
  // ERROR: Incorrect usage of the Fibonacci class because use a lot of memory
  // execute(){
  //   const result = [];
  //   result.push(0);
  //   result.push(1);
  //   result.push(2);
  //   result.push(3);
  //   return
  // }
}

module.exports = Fibonacci;
