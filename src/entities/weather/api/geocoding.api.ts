import { httpClient } from '@/shared/api'
import { weatherConfig } from '@/shared/config'
import type { Coords } from '@/entities/weather'

type GeocodingResult = {
  latitude: number
  longitude: number
}

type GeocodingResponse = {
  results?: GeocodingResult[]
}

export const getCoordsByCity = async (city: string): Promise<Coords> => {
  const response = await httpClient.get<GeocodingResponse>('search', {
    baseUrl: weatherConfig.geoUrl,
    params: {
      name: city,
      count: 1,
      language: 'en',
      format: 'json',
    },
  })

  const firstResult = response.results?.[0]

  if (!firstResult) {
    throw new Error('City not found')
  }

  return {
    latitude: firstResult.latitude,
    longitude: firstResult.longitude,
  }
}
