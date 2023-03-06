export class ValidationError extends Error {
  public statusCode = 403;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ValidationError";
    if (status) {
      this.statusCode = status;
    }
  }
}
