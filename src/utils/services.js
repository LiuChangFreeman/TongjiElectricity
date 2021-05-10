import Taro from "@tarojs/taro";

export async function loginTongXinYun(data){
  const response = await Taro.request({
    url:"https://txb.tongji.edu.cn/openaccess/user/login",
    method:"POST",
    data:data,
    dataType:"json",

  })
  return response.data;
}

export async function logoffTongXinYun(user){
  const response = await Taro.request({
    url:"https://txb.tongji.edu.cn/xuntong/logout.action",
    method:"POST",
    data: {},
    dataType:"json",
    header:{
      "openToken":user.token
    }
  })
  return response.data;
}


export async function getServiceStatus(){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/status"
  })
  return response.data;
}

export async function getCampusData(){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/campus_v2"
  })
  return response.data;
}

export async function getBuildData(data){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/build_v2",
    data:data
  })
  return response.data;
}

export async function getCenterData(data){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/center_v2",
    data:data
  })
  return response.data;
}

export async function getRoomData(data){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/room_v2",
    data:data
  })
  return response.data;
}

export async function getMoney(data){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/money_v2",
    data:data
  })
  return response.data;
}

export async function getRecord(data){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/record_v2",
    data:data
  })
  return response.data;
}

export async function getUsage(data){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/used",
    data:data
  })
  return response.data;
}

export async function getPublicNotification(){
  const response = await Taro.request({
    url:"https://api.liuchangfreeman.xyz/tongji_service/public"
  })
  return response.data;
}

export async function getLightAppTicket(data){
  const response = await Taro.request({
    url:"https://tjyun.tongji.edu.cn/3gol/getLightAppURL.action",
    method:"POST",
    data:data,
    dataType:"json"
  })
  return response.data;
}
