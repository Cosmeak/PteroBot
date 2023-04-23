import { yellow, gray, red, cyan, green, bold } from "colorette";

class Logger {
  static log(string) {
    return console.log(gray(string));
  }
  static warn(string) {
    return console.warn(yellow(`${bold("[WARN]")} ${string}`));
  }
  static error(string) {
    return console.error(red(`${bold("[ERROR]")} ${string}`));
  }
  static info(string) {
    return console.info(cyan(`${bold("[INFO]")} ${string}`));
  }
  static success(string) {
    return console.log(green(string));
  }
};

export { Logger };
