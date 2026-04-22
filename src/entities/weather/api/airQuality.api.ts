import { httpClient } from '@/shared/api'
import { weatherConfig } from '@/shared/config'

type AirQualityResponse = {
  current?: {
    us_aqi?: number
  }
}

export const getAirQualityIndexByCoords = async (latitude: number, longitude: number): Promise<number> => {
  const response = await httpClient.get<AirQualityResponse>('air-quality', {
    baseUrl: weatherConfig.airQualityUrl,
    params: {
      latitude,
      longitude,
      current: 'us_aqi',
      timezone: 'Europe/Moscow',
    },
  })

  const airQualityIndex = response.current?.us_aqi

  if (airQualityIndex === undefined) {
    throw new Error('Air quality index is unavailable')
  }

  return Math.round(airQualityIndex)
}
