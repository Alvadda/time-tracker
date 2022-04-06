import { convertArrayToCSV } from 'convert-array-to-csv'

export const createCSVDownloadLink = <T>(data: Array<T>) => {
  const csvFromArrayOfObjects = convertArrayToCSV(data)

  const blob = new Blob([csvFromArrayOfObjects], { type: 'octet-stream' })
  const href = URL.createObjectURL(blob)
  return href
}
