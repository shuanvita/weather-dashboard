export type WeatherMetricTone = 'default' | 'good' | 'warning'

export type WeatherMetric = {
  title: string
  value: string | number
  description: string
  icon: string
  tone: WeatherMetricTone
}

export const weatherOverviewMetrics: WeatherMetric[] = [
  {
    title: 'Air Quality Index',
    value: 53,
    description: 'Good',
    icon: 'wind',
    tone: 'good',
  },
  {
    title: 'UV Index',
    value: 3,
    description: 'Moderate',
    icon: 'sun',
    tone: 'warning',
  },
  {
    title: 'Pressure (hpa)',
    value: 1006,
    description: 'Normal',
    icon: 'max-temp',
    tone: 'default',
  },
]
