import { useApp } from '../context/AppContext'
import { getCareer } from '../data/careers'

export function useCareerTheme() {
  const { user } = useApp()
  const career = getCareer(user?.careerId ?? undefined)
  return career?.colors ?? null
}
