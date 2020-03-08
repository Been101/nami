/*
 * @Author: Ace
 * @Date: 2020-03-08 16:31:25
 * @Description: 配置项
 */

module.exports = {
  // puppet_padplus Token
  token: "puppet_padplus_token",
  // 机器人名字
  name: "Nami",
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      前端真好玩: "前端真好玩"
    },
    // 加入房间回复
    roomJoinReply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ["加群", "前端"],
    // 是否开启加群
    addRoom: true
  },
  task: {
    taskName: '发送新闻',
    roomId: '',
    url: 'http://api.tianapi.com/internet/index?key=apikey&num=10',
    time: '14:42:0', // /h/m/s
    date: ''
  }
}
