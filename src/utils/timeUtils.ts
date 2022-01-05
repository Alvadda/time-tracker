const minutesToHourMinutes = (minutes: number) => {
  const hours = minutes / 60
  const rhours = Math.floor(hours)
  const m = (hours - rhours) * 60
  const rminutes = Math.round(m)
  return `${rhours}:${rminutes}`
}

export { minutesToHourMinutes }
