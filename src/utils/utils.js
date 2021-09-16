import Taro from "@tarojs/taro";
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

export function getFormatDate(offset) {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear()-offset;
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  return year + seperator1 + month + seperator1 + strDate;
}

export function encrypt(account,password){
  const key = Utf8.parse(account);
  const iv=Utf8.parse(account.substr(0,8));
  const encrypted = CryptoJS.DES.encrypt(password, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv:iv
  });
  return Base64.stringify(encrypted.ciphertext)
}

function uuid() {
  let result = [];
  const hex = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    result[i] = hex.substr(Math.floor(Math.random() * 0x10), 1);
  }
  result[14] = "4";
  result[19] = hex.substr((result[19] & 0x3) | 0x8, 1);
  result[8] = result[13] = result[18] = result[23] = "-";
  return result.join("");
}

export function getDevice(){
  const device=Taro.getSystemInfoSync();
  const device_id=uuid();
  const data={
    "deviceId":device_id,
    "ua":`38881\/10.5.1;${device.system};${device.platform};${device.brand};102;deviceId:${device_id};deviceName:${device.system};clientId:38881;os:${device.system};brand:${device.brand};model:${device.model};oem:tjdx;lang:zh-CN;fontNum:0;bno:10.5.1(1313)`,
    "accountType":"",
    "appClientId":"38881",
    "deviceType":device.platform,
    "eid":"",
  }
  return data
}
