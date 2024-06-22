class Tax {
  static get taxesBasedOnAge() {
    return [
      { from: 18, to: 25, then: 1.9 },
      { from: 26, to: 30, then: 1.5 },
      { from: 31, to: 60, then: 1.3 },
      { from: 61, to: 100, then: 1.9 },
    ];
  }
}

module.exports = Tax;
