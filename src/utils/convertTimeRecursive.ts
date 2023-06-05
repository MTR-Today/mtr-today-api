import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

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
