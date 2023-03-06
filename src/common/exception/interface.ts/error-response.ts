export interface IErrorResponse {
  path: string;
  method: string;
  status: number;
  codeError: number;
  message: string;
}
