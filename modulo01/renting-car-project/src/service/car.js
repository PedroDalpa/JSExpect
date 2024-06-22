const BaseRepository = require('../repository/base');

class CarService {
  constructor({ carRepository }) {
    this.carRepository = new BaseRepository({ file: carRepository });
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
}

module.exports = CarService;
