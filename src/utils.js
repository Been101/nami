const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
function getNow() {
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()
  const fullDate = `${year}-${month}-${day} ${weeks[week]} ${time}`
  return {
    time,
    fullDate
  }
}
module.exports = {
  getNow
}