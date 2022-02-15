import { useSelector } from 'react-redux'
import { selectDefaultBreak, selectDefaultBreakRule } from '../settings/settingsSlice'

export const useDefaultBreak = () => {
  const defaultBreak = useSelector(selectDefaultBreak)
  const defaultBreakRule = useSelector(selectDefaultBreakRule)

  const getDefaultBreak = (duration?: number) => {
    if (!duration) return undefined

    return duration >= Number(defaultBreakRule) / 60 ? Number(defaultBreak) : undefined
  }

  return { getDefaultBreak }
}
