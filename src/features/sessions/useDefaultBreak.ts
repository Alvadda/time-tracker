import { useSelector } from 'react-redux'
import { HOUR } from '../../utils/constants '
import { selectDefaultBreak, selectDefaultBreakRule } from '../settings/settingsSlice'
import { NumberOrEmpty } from './../../types/index'

const isBreakToAplly = (duration: number, defaultBreakRule: NumberOrEmpty) => {
  if (defaultBreakRule === '' || defaultBreakRule <= 0) return false
  return duration > defaultBreakRule * HOUR
}

const isDurationLongerThenBreak = (duration: number, defaultBreak: NumberOrEmpty) => {
  if (defaultBreak === '' || defaultBreak <= 0) return false
  if (duration <= defaultBreak) false

  return true
}

export const useDefaultBreak = () => {
  const defaultBreak = useSelector(selectDefaultBreak)
  const defaultBreakRule = useSelector(selectDefaultBreakRule)

  const getDefaultBreak = (duration?: number) => {
    if (duration && isBreakToAplly(duration, defaultBreakRule) && isDurationLongerThenBreak(duration, defaultBreak)) {
      return Number(defaultBreak)
    }

    return 0
  }

  return { getDefaultBreak }
}
