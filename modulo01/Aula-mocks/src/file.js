const { readFile } = require('fs/promises');
const { error } = require('./constants');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async csvTOJson(filePath) {
    // to see content of file in terminal: node
    // fs.readFileSync('./mocks/valid-file.csv', 'utf8')
    const content = await readFile(filePath, 'utf-8');

    const validation = this.isValid(content);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return this.parseCSVToJSON(content);
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [headers, ...content] = csvString.split(/\r?\n/);

    const isHeaderValid = headers === options.fields.join(',');
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR,
        valid: false,
      };
    }

    if (!content.length) {
      return {
        error: error.FILE_EMPTY_ERROR,
        valid: false,
      };
    }

    if (content.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR,
        valid: false,
      };
    }

    return {
      error: null,
      valid: true,
    };
  }

  static parseCSVToJSON(csvString) {
    const [headers, ...content] = csvString.split(/\r?\n/);
    const headerParams = headers.split(',');

    const users = content.map((row, index) => {
      const rowParams = row.split(',');
      const user = {};
      for (const i in rowParams) {
        user[headerParams[i].trim()] = rowParams[i].trim();
      }
      return user;
    });

    return users;
  }
}

module.exports = File;
