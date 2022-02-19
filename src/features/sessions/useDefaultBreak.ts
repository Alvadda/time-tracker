import { useSelector } from 'react-redux'
import { selectDefaultBreak, selectDefaultBreakRule } from '../settings/settingsSlice'
import { NumberOrEmpty } from './../../types/index'

const isBreakToAplly = (duration: number, defaultBreakRule: NumberOrEmpty) => {
  if (defaultBreakRule === '' || defaultBreakRule <= 0) return false

  return duration > defaultBreakRule / 60
}

export const useDefaultBreak = () => {
  const defaultBreak = useSelector(selectDefaultBreak)
  const defaultBreakRule = useSelector(selectDefaultBreakRule)

  const getDefaultBreak = (duration?: number) => {
    if (!duration) return 0
    if (isBreakToAplly(duration, defaultBreakRule)) return 0
    if (defaultBreak === '' || defaultBreak <= 0) return 0

    return Number(defaultBreak)
  }

  return { getDefaultBreak }
}
