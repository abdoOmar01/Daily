const toFull = (ISOString) => {
  const date = new Date(ISOString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = (hours % 12) || 12
  const formattedDate = `${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`

  return formattedDate
}

const toCalendar = (ISOString) => {
  const date = new Date(ISOString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const formattedMonth = month.toString().padStart(2, "0")
  const formattedDay = day.toString().padStart(2, "0")
  const formattedHour = hour.toString().padStart(2, "0")
  const formattedMinute = minute.toString().padStart(2, "0")
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMinute}`

  return formattedDate
}

export default { toFull, toCalendar }