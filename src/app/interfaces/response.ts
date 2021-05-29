export interface ApiResponse {
  status: number;
  error: boolean,
  message: string,
  err?: string,
  data: any;
  code: number;
  id: any
}
