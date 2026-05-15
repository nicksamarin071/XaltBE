import debug, { type Debugger } from "debug";

interface ColorMap {
  [key: string]: number;
}

const colors: ColorMap = {
  red: 1,
  yellow: 3,
  cyan: 6,
  green: 2,
  blue: 4,
  magenta: 5,
};

const logInfo: Debugger = debug("log:info");
(logInfo as any).color = colors.yellow; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.

const logSuccess: Debugger = debug("log:success");
(logSuccess as any).color = colors.green; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.

const logError: Debugger = debug("log:error");
(logError as any).color = colors.red; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.

const logData: Debugger = debug("log:data");
(logData as any).color = colors.magenta; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.

export { logInfo, logSuccess, logError, logData };
