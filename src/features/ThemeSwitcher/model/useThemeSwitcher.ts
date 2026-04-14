import { useDark } from '@vueuse/core'

export type ThemeMode = 'dark' | 'light'

export const useThemeSwitcher = () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'theme',
    initialValue: 'dark',
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setTheme = (theme: ThemeMode) => {
    isDark.value = theme === 'dark'
  }

  return { isDark, toggleTheme, setTheme }
}
