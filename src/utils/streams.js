import fs from 'fs';
import minimist from 'minimist';
import winston from 'winston';
import through2 from 'through2';
import split from 'split';
import request from 'request';

import { promisify } from 'util';
import 'babel-polyfill';

import utils from '../modules/utils';

// promisified readdir
const readdirAsync = promisify(fs.readdir);

// message constants
const MESSAGES = {
  ERROR: {
    WRONG_ARGUMENTS: 'Wrong arguments, please see --help.',
    COMMAND_FAILED: 'Ooops, something went wrong.',
  },
  INFO: {
    WRONG_COMMAND: 'Wrong command.',
    NO_FILES_TO_BUNDLE: 'No css files to bundle',
    WRONG_PATH: 'Wrong path',
  },
};

// pipe data from readStream to writeStream
const inputOutput = (readStream = process.stdin, writeStream = process.stdout) => {
  readStream
    .pipe(writeStream);
};

// read file from source and pipe into writeStream
const inputOutputFile = (fileName, writeStream = process.stdout) => {
  inputOutput(fs.createReadStream(fileName), writeStream);
};

// transform readStream using transformFn and write to writeStream
const transform = (readStream = process.stdin, writeStream = process.stdout, transformFn) => {
  inputOutput(
    readStream
      .pipe(through2(transformFn)),
    writeStream,
  );
};

// transform data from readStream to uppercase and write to writeStream
const upperCaseTransform = (readStream = process.stdin, writeStream = process.stdout) => {
  transform(
    readStream,
    writeStream,
    (chunk, enc, callback) => {
      callback(null, chunk.toString().toUpperCase());
    },
  );
};

// transform csv data from readStream to json data and write to writeStream
const csvToJsonTransform = (readStream = process.stdin, writeStream = process.stdout) => {
  // remember keys from first csv line
  const temp = {
    firstDataChunk: true, // first data chunk identificator
  };

  transform(
    readStream
      .pipe(split())
      .on('end', () => {
        // add array identificator to the end
        writeStream.write(']');
      }),
    writeStream,
    (chunk, enc, callback) => {
      // if it is first line of csv, then remember keys
      if (!temp.keys) {
        temp.keys = chunk.toString();
        // add array identificator to the start
        callback(null, '[');
      } else if (chunk.toString()) { // parse line by line otherwise
        callback(
          null,
          // parse csv line to json line
          // and add ',' before json representation of csv line if it is not the first data line
          `${temp.firstDataChunk ? '' : ','}${JSON.stringify(utils.csvToJson(`${temp.keys}\n${chunk.toString()}`)[0])}`,
        );
        // reset first data chunk identificator
        temp.firstDataChunk = false;
      }
    },
  );
};

// wrapper for file input
const csvFileToJsonTransform = (fileName, saveToFile = false) => {
  // save to the same fileName, but with .json ?
  if (saveToFile) {
    csvToJsonTransform(fs.createReadStream(fileName), fs.createWriteStream(`${fileName.replace('.csv', '.json')}`));
  } else {
    csvToJsonTransform(fs.createReadStream(fileName));
  }
};

// bundle all css files into dir to one result css files
const cssBundler = async (path) => {
  if (!path) {
    winston.info(MESSAGES.INFO.WRONG_PATH);
    return;
  }

  // read file names from path
  let filesName = await readdirAsync(path);
  // filter not css and bundle files
  filesName = filesName.filter(fileName => fileName.includes('.css') && fileName !== 'bundle.css');

  // if no files then finish
  if (!filesName.length) {
    winston.info(MESSAGES.INFO.NO_FILES_TO_BUNDLE);
    return;
  }

  // create result stream
  const writeStream = fs.createWriteStream(`${path}/bundle.css`);

  // reduce through all streams
  // pipe a new one once prev was finished
  const firstReadStream = fs.createReadStream(`${path}/${filesName[0]}`);
  const lastReadStream = filesName.reduce(
    (prevStream, fileName) => {
      const nextStream = fs.createReadStream(`${path}/${fileName}`);
      prevStream.on('end', () => nextStream.pipe(writeStream, { end: false }));

      return nextStream;
    },
    firstReadStream,
  );

  // start piping
  firstReadStream.pipe(writeStream, { end: false });
  // add requested css
  lastReadStream.on('end', () => request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css')
    .pipe(writeStream));
};

// print help message
const printHelp = () => {
  winston.info(`
    Usage: node ./streams.js options

    Options:
      -a, --action\texecute specific command. Possible commands: io, uppercase, transform-csvfile, bundle-css
      -h, --help\tprint help
      -s, --save\t[optional] indicates should result be saved to the input file, but with another file extension. Can be used with transform-csvfile command
      -f, --file\t[optional] name of input file. Can be used with io and transform-csvfile commands
      -p, --path\t[optional] path to directory with css files. Can be used with bundle-css action
  `);
};

// parse arguments from command line
const argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    a: 'action',
    f: 'file',
    s: 'save',
    p: 'path',
  },
  string: [
    'action',
    'file',
    'path',
  ],
  boolean: [
    'save',
    'help',
  ],
});

// possible commands
const commands = {
  io: {
    required: ['file'],
    handler: () => {
      inputOutputFile(argv.file);
    },
  },
  uppercase: {
    required: [],
    handler: () => {
      upperCaseTransform();
    },
  },
  'transform-csvfile': {
    required: ['file'],
    handler: () => {
      csvFileToJsonTransform(argv.file, argv.save);
    },
  },
  'bundle-css': {
    required: ['path'],
    handler: () => {
      cssBundler(argv.path);
    },
  },
  help: {
    required: [],
    handler: () => {
      printHelp();
    },
  },
};

// execute handler for each command
const executeCommand = (handler) => {
  try {
    handler();
  } catch (e) {
    winston.error(MESSAGES.ERROR.COMMAND_FAILED, e);
  }
};

const start = () => {
  if (!argv.action && !argv.help) {
    winston.info(MESSAGES.INFO.WRONG_COMMAND);
    executeCommand(commands.help.handler);

    return;
  }

  const command = argv.help ? 'help' : argv.action; // help is more specific
  if (command) { // if some command were mentioned
    // validate input
    const validCommand = commands[command].required.every(dependency => argv[dependency]);

    if (validCommand) { // if valid then try to execute a command
      executeCommand(commands[command].handler);
    } else { // handle wrong arguments
      winston.error(MESSAGES.ERROR.WRONG_ARGUMENTS);
    }
  } else { // finally handle wrong command
    winston.info(MESSAGES.INFO.WRONG_COMMAND);
    printHelp();
  }
};

if (!module.parent) {
  start();
}

export default {
  inputOutput,
  inputOutputFile,
  transform,
  upperCaseTransform,
  csvFileToJsonTransform,
  csvToJsonTransform,
  cssBundler,
};
