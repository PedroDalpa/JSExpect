const assert = require('assert');
const { createSandbox } = require('sinon');
const Service = require('./service');

const BASE_URL_TATOOINE = 'https://swapi.dev/api/planets/1/';
const BASE_URL_ALDERAAN = 'https://swapi.dev/api/planets/2/';

const mocks = {
  alderaan: require('../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json'),
};

const sinon = createSandbox();
(async () => {
  // {
  // MAKE A REQUEST ON EXTERNAL API WITH COST
  //   const service = new Service();
  //   const result = await service.makeRequest(BASE_URL_TATOOINE);
  //   console.log(JSON.stringify(result));
  // }

  // MOCK A EXTERNAL REQUEST API WITHOUT COST
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL_TATOOINE).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_ALDERAAN).resolves(mocks.alderaan);
  {
    const expected = {
      name: 'Tatooine',
      films: 5,
      surfaceWater: '1',
    };

    const result = await service.getPlanets(BASE_URL_TATOOINE);

    assert.deepEqual(result, expected);
  }

  {
    const expected = {
      name: 'Alderaan',
      films: 2,
      surfaceWater: '40',
    };

    const result = await service.getPlanets(BASE_URL_ALDERAAN);

    assert.deepEqual(result, expected);
  }
})();
