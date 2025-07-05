import chalk from 'chalk';

const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
};

const format = (type: string, message: string) => {
  const time = chalk.gray(getTimestamp());
  const label = {
    INFO: chalk.blue('[INFO]'),
    WARN: chalk.yellow('[WARN]'),
    ERROR: chalk.red('[ERROR]'),
    OK: chalk.green('[OK]'),
  }[type.toUpperCase()] || `[${type}]`;

  return `${time} ${label} ${message}`;
};


export const logger = {
  info: (msg: string) => console.log(format('INFO', msg)),
  warn: (msg: string) => console.warn(format('WARN', msg)),
  error: (msg: string) => console.error(format('ERROR', msg)),
  success: (msg: string) => console.log(format('OK', `✅ ${msg}`)),
};
