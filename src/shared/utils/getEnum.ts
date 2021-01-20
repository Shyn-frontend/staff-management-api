export default (enumObj: any): string[] =>
  Object.keys(enumObj).map((key) => enumObj[key]);
