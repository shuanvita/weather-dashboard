export const weatherConfig = {
  baseUrl: 'https://api.open-meteo.com/v1/',
  geoUrl: 'https://geocoding-api.open-meteo.com/v1/',
  airQualityUrl: 'https://air-quality-api.open-meteo.com/v1/',
  defaultCity: 'Moscow',
  defaultCoords: {
    latitude: 55.7558,
    longitude: 37.6176,
  },
  defaultDays: 7,
} as const
