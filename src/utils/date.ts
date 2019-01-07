const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthsToInt = {
  April: 3,
  August: 7,
  December: 11,
  February: 1,
  January: 0,
  July: 6,
  June: 5,
  March: 2,
  May: 4,
  November: 10,
  October: 9,
  September: 8,
}

export function prettifyDate({ date }: { date: Date }) {
  const month = months[date.getMonth()]
  const numberDate = date.getDate().toString()
  const abbr = d => {
    if (d.slice(-1) === '1') return 'st'
    else if (d.slice(-1) === '2') return 'nd'
    else if (d.slice(-1) === '3') return 'rd'
    return 'th'
  }
  const day = `${numberDate}${abbr(numberDate)}`
  const year = date.getFullYear()
  const hours = d => {
    const h = d.getUTCHours()
    const finalH = h > 12 ? h - 12 : h
    const a = h > 12 ? 'pm' : 'am'
    return { hour: finalH, abbr: a }
  }
  const hourObject = hours(date)
  const minutes = d => {
    const min = d.getUTCMinutes().toString()
    return min.length < 2 ? `0${min}` : min
  }
  const time = `${hourObject.hour}:${minutes(date)}${hourObject.abbr}`
  const final = `${month} ${day}, ${year} at ${time}`
  return final
}

export function monthAndDay({ date }: { date: Date }) {
  const month = months[date.getMonth()]
  const numberDate = date.getDate().toString()
  const abbr = d => {
    if (d.slice(-1) === '1') return 'st'
    else if (d.slice(-1) === '2') return 'nd'
    else if (d.slice(-1) === '3') return 'rd'
    return 'th'
  }
  const day = `${numberDate}${abbr(numberDate)}`
  const final = `${month} ${day}`
  return final
}

export function convertToDateObject({ raw, semiFormatted }: { raw?: string; semiFormatted: string }) {
  if (raw === '0') {
    return { fullDate: null, month: 12 } // The picture's date is not defined
  }
  const fullDate = new Date(raw ? parseInt(raw, 10) * 1000 : semiFormatted)
  const month = fullDate.getMonth()
  return { fullDate, month }
}
