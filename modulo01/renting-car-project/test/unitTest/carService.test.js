const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const CarService = require('../../src/service/car');
const carDatabase = join(__dirname, '../../database', 'cars.json');

const mocks = {
  validCarCategory: require('../mocks/valid-car-category.json'),
  validCar: require('../mocks/valid-car.json'),
  validCustomer: require('../mocks/valid-customer.json'),
};

describe('CarService suite tests', () => {
  let carService,
    sandbox = {};
  before(() => {
    carService = new CarService({ carRepository: carDatabase });
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should retrieve a random position from array', () => {
    const data = [0, 1, 2, 3];
    const randomPosition = carService.getRandomPositionFromArray(data);

    expect(randomPosition).to.be.lte(data.length).and.be.gte(0);
  });

  it('should choose the first id from carIds in category', async () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.true;
    expect(result).to.be.equal(expected);
  });
  it('should be able get available car in category', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.true;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.true;
    expect(result).to.be.deep.equal(expected);
  });

  it('should calculate final amount in real', () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    const expected = carService.currencyFormat.format(244.4);
    const result = carService.calculateFinalAmount(
      customer,
      carCategory,
      numberOfDays
    );

    expect(result).to.be.deep.equal(expected);
  });
});
