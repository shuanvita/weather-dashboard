export type QueryParams = Record<string, string | number | boolean | null | undefined>

export type GetOptions = RequestInit & {
  baseUrl?: string
  params?: QueryParams
}

export type HttpClient = {
  get: <T>(path: string, options?: GetOptions) => Promise<T>
}
