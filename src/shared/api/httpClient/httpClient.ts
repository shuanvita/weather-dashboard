import type { GetOptions, HttpClient, QueryParams } from '@/shared/api'

const isJsonContentType = (contentType: string | null) =>
  contentType?.includes('application/json')

const appendQueryParams = (url: URL, params?: QueryParams) => {
  if (!params) {
    return
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return
    }

    url.searchParams.append(key, String(value))
  })
}

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type')

  if (isJsonContentType(contentType)) {
    return response.json()
  }

  return response.text()
}

const resolveUrl = (path: string, baseUrl?: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const resolvedBaseUrl = baseUrl ?? import.meta.env.VITE_API_URL

  if (!resolvedBaseUrl) {
    return new URL(normalizedPath, window.location.origin)
  }

  const normalizedBaseUrl = resolvedBaseUrl.endsWith('/') ? resolvedBaseUrl : `${resolvedBaseUrl}/`
  return new URL(normalizedPath.slice(1), normalizedBaseUrl)
}

export const httpClient: HttpClient = {
  get: async <T>(path: string, options: GetOptions = {}): Promise<T> => {
    const { baseUrl, params, headers, ...restOptions } = options

    const url = resolveUrl(path, baseUrl)
    appendQueryParams(url, params)

    const response = await fetch(url, {
      ...restOptions,
      method: 'GET',
      headers,
    })

    const data = await parseResponseBody(response)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    return data as T
  }
}
