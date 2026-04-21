import type { InjectionKey, Ref } from 'vue'
import type { ForecastResponse } from '@/entities/weather'

export type CurrentWeatherContext = {
  city: Ref<string>
  selectedDayIndex: Ref<number>
  forecast: Ref<ForecastResponse | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
}

export const currentWeatherContextKey: InjectionKey<CurrentWeatherContext> =
  Symbol('currentWeatherContext')
