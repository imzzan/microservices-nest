/* eslint-disable prettier/prettier */
export class ApplicationError extends Error {
    statusCode: number
    constructor (statusCode: number, message : string) {
        super(message)
        this.statusCode = statusCode
      }
}