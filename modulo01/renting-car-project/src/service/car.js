const Tax = require('../entities/tax');
const Transaction = require('../entities/transaction');
const BaseRepository = require('../repository/base');

class CarService {
  constructor({ carRepository }) {
    this.carRepository = new BaseRepository({ file: carRepository });
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getRandomPositionFromArray(array) {
    const listLength = array.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const carIdIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[carIdIndex];
  }
  async getAvailableCar(category) {
    const carId = this.chooseRandomCar(category);
    const car = await this.carRepository.find(carId);

    return car;
  }

  calculateFinalAmount(customer, carCategory, numberOfDays) {
    const { then: tax } = Tax.taxesBasedOnAge.find(
      ({ from, to }) => customer.age >= from && customer.age <= to
    );

    const finalPrice = carCategory.price * tax * numberOfDays;
    return this.currencyFormat.format(finalPrice);
  }

  async rent(customer, carCategory, numberOfDays, startDate) {
    const availableCar = await this.getAvailableCar(carCategory);
    const finalAmount = this.calculateFinalAmount(
      customer,
      carCategory,
      numberOfDays
    );

    const dueDate = new Date(
      startDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000
    );

    const dateFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formatDueDate = dueDate.toLocaleDateString(
      'pt-BR',
      dateFormatOptions
    );
    return new Transaction({
      car: availableCar,
      customer,
      amount: finalAmount,
      startDate,
      dueDate: formatDueDate,
    });
  }
}

module.exports = CarService;
