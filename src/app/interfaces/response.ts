export interface ApiResponse {
  status: number;
  error: boolean,
  message: string,
  err?: string,
  data: Array<any>
  code: number;
  id: any
}
