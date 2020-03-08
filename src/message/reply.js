/*
 * @Author: Ace
 * @Date: 2020-03-08 16:31:25
 */
/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */

const request = require("axios")
// 请求参数解码
const urlencode = require("urlencode")
const { task } = require('../config')
const { getNow } = require('../utils')

function msgReply(info) {
  let url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(info)}`
  return request.get(url).then(res => {
    if (res.statusCode == 200) {
      if (res.isSuccess) {
        let reply = res.data.reply
        // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
        reply = reply.replace(/Smile/g, name)
        return reply
      } else {
        if (res.code == 1010) {
          return "没事别老艾特我，我还以为爱情来了"
        } else {
          return "你在说什么，我听不懂"
        }
      }
    } else {
      return "你在说什么，我脑子有点短路诶！"
    }
  })
}

async function taskApiSync() {
  const { time, fullDate } = getNow()
  if (task.time === time) {
    const news = await request.get(task.url).then(res => {
      if (res.status === 200) {
        return `${fullDate}\r\n\r\n${res.data.newslist.map((news, i) => `${i + 1}. ${news.title}`).join('\r\n')}\r\n新闻详情查看：`
      }
    })
    return news
  }
  return ''
}

module.exports = {
  msgReply,
  taskApiSync
}