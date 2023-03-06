export class HttpException extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HttpException";
    this.statusCode = statusCode;
  }
}
