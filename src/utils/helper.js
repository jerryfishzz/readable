export function capitalizedString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function convertTimestampToReadable(timestamp) {
  const readable = new Date(timestamp)
  return readable.toString()
}