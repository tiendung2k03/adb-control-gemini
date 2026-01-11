// Defines types for the 'toml' package, which lacks its own.
declare module 'toml' {
  function parse(data: string): Record<string, any>;
  export default parse;
}
