import debug, {} from "debug";
const colors = {
    red: 1,
    yellow: 3,
    cyan: 6,
    green: 2,
    blue: 4,
    magenta: 5,
};
const logInfo = debug("log:info");
logInfo.color = colors.yellow; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.
const logSuccess = debug("log:success");
logSuccess.color = colors.green; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.
const logError = debug("log:error");
logError.color = colors.red; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.
const logData = debug("log:data");
logData.color = colors.magenta; // 'color' property is not part of the Debugger interface, so we cast it to 'any'.
export { logInfo, logSuccess, logError, logData };
//# sourceMappingURL=debug.js.map