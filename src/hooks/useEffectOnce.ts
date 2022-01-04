import { EffectCallback, useEffect } from 'react'

export const useEffectOnce = (effect: EffectCallback) => {
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
