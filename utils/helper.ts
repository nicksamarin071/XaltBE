    export const generateFileName = (fileName: string): string => {
  const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
  const now = new Date();
  const timestamp = `XA-${now.toISOString()}`;
  return `${timestamp}.${fileExtension}`;
};
