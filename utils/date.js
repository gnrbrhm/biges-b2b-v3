import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')
var toObject = require('dayjs/plugin/toObject')
var localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/tr')

dayjs.locale('tr')
dayjs.extend(customParseFormat)
dayjs.extend(toObject)
dayjs.extend(localizedFormat)

export const dateFormat = value => {
  let date = dayjs(value, 'DD-MM-YYYY').toObject()
  return date.years + '-' + (date.months + 1) + '-' + date.date
}

export const dateFormat2 = value => {
  let date = dayjs(value, 'DD-MM-YYYY').toObject()
  return date.date + '-' + (date.months + 1) + '-' + date.years
}

export const dateFormatTR = value => {
  return dayjs(value).format('DD-MM-YYYY')
}

export const dateSubtract = value => {
  return dateFormatTR(
    dayjs()
      .subtract(value, 'M')
      .format('YYYY-MM-DD')
  )
}

export const currentDate = value => {
  return dayjs().format('DD-MM-YYYY')
}

export const currentDate2 = value => {
  return dayjs()
    .startOf('month')
    .format('DD-MM-YYYY')
}

export const currentDateStartYear = value => {
  return dayjs().format('YYYY-MM-DD')
}

export const dateFormatLL = value => {
  return dayjs(value).format('LL')
}
export const dateFormatLLLL = value => {
  return dayjs(value).format('LLLL')
}

export const dateOfBeginningOfYear = value => {
  return dayjs()
    .startOf('year')
    .format('YYYY-MM-DD')
}
