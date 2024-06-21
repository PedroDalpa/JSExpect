const { error } = require('./src/constants');
const File = require('./src/file');
const assert = require('assert');

//IFEE
(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const expected = new Error(error.FILE_EMPTY_ERROR);
    const result = File.csvTOJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = './mocks/invalid-header.csv';
    const expected = new Error(error.FILE_FIELDS_ERROR);
    const result = File.csvTOJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = './mocks/invalid-file-size.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR);
    const result = File.csvTOJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = './mocks/valid-file.csv';
    const expected = [
      {
        id: 1,
        name: 'Pedro',
        profession: 'developer',
        age: 22,
      },
      {
        id: 2,
        name: 'jose',
        profession: 'QA',
        age: 26,
      },
      {
        id: 3,
        name: 'Erick',
        profession: 'manager',
        age: 28,
      },
    ];
    const result = await File.csvTOJson(filePath);
    assert.deepEqual(result, expected);
  }
})();
