export const generateFileName = (fileName) => {
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
    const now = new Date();
    const timestamp = `XA-${now.toISOString()}`;
    return `${timestamp}.${fileExtension}`;
};
//# sourceMappingURL=helper.js.map