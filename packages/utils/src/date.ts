export const formatDate = (value: string) => value.split("-").reverse().join(".")

export const dateDiff = (endDate: Date, startDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  return {
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
    weeks
  }
}