/*
* @Author: Ace
* @Date: 2020-03-08 16:31:25
* @Description: 进入房间监听回调
*/

// 配置文件
const config = require("./config")
// 加入房间回复
// 管理群组列表
const roomList = config.room.roomList

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
module.exports = async function onRoomJoin(room, inviteeList, inviter) {
  // 判断配置项群组id数组中是否存在该群聊id
  const joinedRoom = roomList.find(r => r.id === room.id)
  if (joinedRoom) {
    // let roomTopic = await room.topic()
    inviteeList.map(c => {
      // 发送消息并@
      room.say(joinedRoom.roomJoinReply, c)
    })
  }
}
