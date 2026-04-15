export type WeatherMetricTone = 'default' | 'good' | 'warning'

export type WeatherOverviewMetricItem = {
  id: string
  type: 'metric'
  title: string
  value: string | number
  description: string
  icon: string
  tone: WeatherMetricTone
}

export type WeatherOverviewPrecipitationPoint = {
  label: string
  value: number
}

export type WeatherOverviewPrecipitationItem = {
  id: string
  type: 'precipitation'
  title: string
  cols: 2
  points: WeatherOverviewPrecipitationPoint[]
}

export type WeatherOverviewSunCycleItem = {
  id: string
  type: 'sun-cycle'
  title: string
  sunrise: string
  sunset: string
  sunriseIcon: string
  sunsetIcon: string
}

export type WeatherOverviewItem =
  | WeatherOverviewMetricItem
  | WeatherOverviewPrecipitationItem
  | WeatherOverviewSunCycleItem

export const weatherOverviewMetrics: WeatherOverviewItem[] = [
  {
    id: 'air-quality-index',
    type: 'metric',
    title: 'Air Quality Index',
    value: 53,
    description: 'Good',
    icon: 'wind',
    tone: 'good',
  },
  {
    id: 'uv-index',
    type: 'metric',
    title: 'UV Index',
    value: 3,
    description: 'Moderate',
    icon: 'sun',
    tone: 'warning',
  },
  {
    id: 'pressure',
    type: 'metric',
    title: 'Pressure (hpa)',
    value: 1006,
    description: 'Normal',
    icon: 'pressure',
    tone: 'default',
  },
  {
    id: 'precipitation',
    type: 'precipitation',
    title: 'Precipitation',
    cols: 2,
    points: [
      { label: '10AM', value: 47 },
      { label: '11AM', value: 56 },
      { label: '12PM', value: 66 },
      { label: '1PM', value: 70 },
      { label: '2PM', value: 63 },
      { label: '3PM', value: 54 },
      { label: '4PM', value: 60 },
    ],
  },
  {
    id: 'sunrise-sunset',
    type: 'sun-cycle',
    title: 'Sunrise & Sunset',
    sunrise: '7:06 AM',
    sunset: '7:03 PM',
    sunriseIcon: 'sunrise',
    sunsetIcon: 'sunset',
  },
]
