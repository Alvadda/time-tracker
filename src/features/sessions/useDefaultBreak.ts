import { useSelector } from 'react-redux'
import { selectDefaultBreak, selectDefaultBreakRule } from '../settings/settingsSlice'

export const useDefaultBreak = () => {
  const defaultBreak = useSelector(selectDefaultBreak)
  const defaultBreakRule = useSelector(selectDefaultBreakRule)

  const getDefaultBreak = (duration?: number) => {
    if (!duration) return 0
    if (defaultBreakRule === '' || defaultBreakRule <= 0) return 0
    if (defaultBreak === '' || defaultBreak <= 0) return 0

    return Number(defaultBreak)
  }

  return { getDefaultBreak }
}
