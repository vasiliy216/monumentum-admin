/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  var mongoose: any
}

declare interface String {
  toCamelCase(): string
}

export { }