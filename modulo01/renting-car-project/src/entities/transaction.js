class Transaction {
  constructor({ customer, car, amount, startDate, dueDate }) {
    this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.startDate = startDate;
    this.dueDate = dueDate;
  }
}

module.exports = Transaction;
