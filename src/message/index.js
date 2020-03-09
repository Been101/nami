/*
 * @Author: Ace
 * @Date: 2020-03-08 16:31:25
 */
const { Message } = require("wechaty")
// node-request请求模块包

// 配置文件
const { isAddRoom, isInRoom } = require('./msg_room')
const { msgReply, taskApiSync } = require('./reply')
const msgReg = /^娜美/
// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {

    // 判断消息来自自己，直接return
    if (msg.self()) return

    console.log("=============================")
    console.log(`msg : ${msg}`)
    console.log(
      `from: ${msg.from() ? msg.from().name() : null}: ${
      msg.from() ? msg.from().id : null
      }`
    )
    console.log(`to: ${msg.to()}`)
    console.log(`text: ${msg.text()}`)
    console.log(`isRoom: ${msg.room()}`)
    console.log("=============================")

    // 判断此消息类型是否为文本
    if (msg.type() == Message.Type.Text) {
      // 判断消息类型来自群聊
      if (msg.room()) {
        // 获取群聊
        const room = await msg.room()
        setInterval(async () => {
          const news = await taskApiSync();
          news && room.say(news)
        }, 1000);
        if (msgReg.test(msg.text())) {
          let sendText = msg.text().replace('娜美', "")

          // 请求机器人接口回复
          let res = await msgReply(sendText)

          // 返回消息，并@来自人
          room.say(res, msg.from())
          return
        }

        // 收到消息，提到自己
        if (await msg.mentionSelf()) {
          // 获取提到自己的名字
          let self = await msg.to()
          self = "@" + self.name()
          // 获取消息内容，拿到整个消息文本，去掉 @+名字
          let sendText = msg.text().replace(self, "")

          // 请求机器人接口回复
          let res = await msgReply(sendText)

          // 返回消息，并@来自人
          room.say(res, msg.from())
          return
        }

        // 收到消息，没有提到自己  忽略
      } else {
        // 回复信息是关键字 “加群”
        if (await isAddRoom(msg)) return

        // 回复信息是所管理的群聊名
        if (await isInRoom(bot, msg)) return

        // 请求机器人聊天接口
        let res = await msgReply(msg.text())
        // 返回聊天接口内容
        await msg.say(res)
      }
    } else {
      console.log("消息不是文本！")
    }
  }
}