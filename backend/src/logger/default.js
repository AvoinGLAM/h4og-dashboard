import chalk from 'chalk';

const typePrefixes = {
    "info": chalk.bgCyan("[I]"),
    "warn": chalk.bgMagenta("[W]"),
    "error": chalk.bgRed("[E]"),
    "debug": chalk.bgWhite("[D]"),
}
const log = (type, str, meta) => {
    console.log(`${typePrefixes[type]} ${str}`);
};

export const info = (str, meta) => log("info", str);
export const warn = (str, meta) => log("warn", str);
export const error = (str, meta) => log("error", str);
export const debug = (str, meta) => log("debug", str);  
