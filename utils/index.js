export const trimString = (value, maxCharLength) => {
  if (value?.length > maxCharLength)
    return value.slice(0, maxCharLength) + '...'
  else return value
}

export const getImgUrl = pic => {
  return require(`../assets${pic}`)
}

export const array_move = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr // for testing
}

export const getNotificationIcon = item_type => {
  switch (item_type) {
    case 'campaign':
      return 'etkinlik'
      break
    case 'payment_ok':
      return 'bilgilendirme'
      break
    case 'raw_email':
      return 'bilgilendirme'
      break
    case 'admin_announcement':
      return 'duyuru-2'
      break
    case 'admin_information':
      return 'uyari'
      break
    default:
      return 'duyuru'
      break
  }
}

export const mixinNumberFormatTr = value => {
  try {
    if (value) {
      var currency_symbol = '₺'
      var numeralVal = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2
      })
      return numeralVal.format(value).replace(currency_symbol, '')
    }
    return ''
  } catch (error) {
    console.error(error)
    return ''
  }
}
