const csvToJson = (csvString) => {
  const splittedCsvString = csvString.split('\n');
  const keys = splittedCsvString.shift().split(',');

  return splittedCsvString
    .filter(line => line)
    .map((line) => {
      const obj = {};
      const row = line.split(',');

      for (let i = 0; i < keys.length; i += 1) {
        obj[keys[i]] = row[i];
      }

      return obj;
    });
};

export default {
  csvToJson,
};
