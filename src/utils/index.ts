export * from './downloadHelper'
export * from './timeUtil'

export const formatCurrency = (number: number, currency: 'EUR' = 'EUR') =>
  Intl.NumberFormat(undefined, { style: 'currency', currency }).format(number)
