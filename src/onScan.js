/*
* @Author: Ace
* @Date: 2020-03-08 16:31:25
* @Description: 机器人需要扫描二维码时监听
*/

//进入房间监听回调
const Qrterminal = require("qrcode-terminal")

module.exports = function onScan(qrcode, status) {
  Qrterminal.generate(qrcode, { small: true })
}
