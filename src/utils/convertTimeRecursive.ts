import dayjs from 'dayjs'

export const convertTimeRecursive = <T>(data: T, timeFormat: string): T => {
  if (!data) return data

  if (Array.isArray(data)) {
    return data.map(item => convertTimeRecursive(item, timeFormat)) as T
  }

  if (typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        convertTimeRecursive(value, timeFormat),
      ])
    ) as T
  }

  if (typeof data === 'string') {
    try {
      const convertedDate = dayjs.tz(data, timeFormat, 'Asia/Hong_Kong')

      return (convertedDate.isValid() ? convertedDate.toISOString() : data) as T
    } catch (e) {
      return data
    }
  }

  return data
}
