import { observable } from 'mobx'
import Taro from "@tarojs/taro";
import {
  getServiceStatus,getPublicNotification,getLightAppTicket,
  getCampusData,getBuildData,getCenterData,getRoomData,getMoney
} from '../utils/services'

const model = observable({
  state:{
    money:null,
    user:null,
    room_info:null,
    mode:"local",
    ticket:null,
    auto:false,
    loading:false,
    temp_campus:null,
    temp_build:null,
    temp_center:null,
    temp_room:null,
    campus_list: [],
    build_list: [],
    center_list: [],
    room_list: [],
    viewstate_campus: null,
    viewstate_build: null,
    viewstate_center: null,
    viewstate_room: null,
  },

  initData() {
    const user=Taro.getStorageSync("user");
    if(user){
      this.state.user=user;
    }
    const auto=Taro.getStorageSync("auto");
    if(auto){
      this.state.auto=auto;
    }
    const room_info=Taro.getStorageSync("room_info");
    if(room_info){
      this.state.room_info=room_info;
    }
    const mode=Taro.getStorageSync("mode");
    if(mode){
      this.state.mode=mode;
    }
  },

  async getStatus(){
    const result=await getServiceStatus();
    if(result["result"]){

    }
  },

  async searchMoney(){
    this.state.loading=true;
    const room_info=this.state.room_info;

    const data={
      "campus":room_info.campus.id,
      "build":room_info.build.id,
      "center":room_info.center.id,
      "room":room_info.room.id,
      "viewstate":room_info.viewstate
    }
    try{
      const result=await getMoney(data);
      const {money}=result;
      if(money){
        const campus=room_info.campus.id;
        if(campus==="2"||campus==="4"||campus==="9"){
          this.state.money=`${money}度(约${(parseFloat(money) / 1.6207).toFixed(2)}元)`;
        }
        else{
          this.state.money=`${money}元`;
        }
      }
      else{
        this.state.money=`查询失败,请重试`;
      }
    }
    catch (e) {
      this.state.money=`查询失败,请重试`;
    }
    this.state.loading=false;
  },

  async getCampus(){
    try{
      const result=await getCampusData();
      this.state.campus_list=result["data"];
      this.state.temp_campus=null;
      this.state.viewstate_campus=result["viewstate"];
      this.state.build_list=[];
      this.state.temp_build=null;
      this.state.viewstate_build=null;
      this.state.center_list=[];
      this.state.temp_center=null;
      this.state.viewstate_center=null;
      this.state.room_list=[];
      this.state.temp_room=null;
      this.state.viewstate_room=null;
    }
    catch (e){

    }
  },

  setCampus(campus){
    this.state.temp_campus=campus;
  },

  async getBuild(data){
    try{
      const result=await getBuildData(data);
      this.state.build_list=result["data"];
      this.state.temp_build=null;
      this.state.viewstate_build=result["viewstate"];
      this.state.center_list=[];
      this.state.temp_center=null;
      this.state.viewstate_center=null;
      this.state.room_list=[];
      this.state.temp_room=null;
      this.state.viewstate_room=null;
    }
    catch (e){

    }
  },

  setBuild(build){
    this.state.temp_build=build;
  },

  async getCenter(data){
    try{
      const result=await getCenterData(data);
      this.state.center_list=result["data"];
      this.state.temp_center=null;
      this.state.viewstate_center=result["viewstate"];
      this.state.room_list=[];
      this.state.temp_room=null;
      this.state.viewstate_room=null;
    }
    catch (e){

    }
  },

  setCenter(center){
    this.state.temp_center=center;
  },

  async getRoom(data){
    try{
      const result=await getRoomData(data);
      this.state.room_list=result["data"];
      this.state.temp_room=null;
      this.state.viewstate_room=result["viewstate"];
    }
    catch (e){

    }
  },

  setRoom(room){
    this.state.temp_room=room;
  },

  saveRoomInfo(){
    const room_info={
      "campus":this.state.temp_campus,
      "build":this.state.temp_build,
      "center":this.state.temp_center,
      "room":this.state.temp_room,
      "viewstate":this.state.viewstate_room
    }
    this.state.room_info=room_info;
    Taro.setStorageSync("room_info",room_info);
  },

  setAuto(flag){
    this.state.auto=flag;
    Taro.setStorageSync("auto",flag);
  },

  setUser(user){
    this.state.user=user;
    Taro.setStorageSync("user",user);
  },

  logOff(){
    this.state.user=null;
    Taro.removeStorageSync("user");
  },

  async getTicket(data){
    const result=await getLightAppTicket(data);
    if(result["success"]){
      this.state.ticket=result["data"]["ticket"];
    }
  },

  async getPublic(){
    const result=await getPublicNotification();
    const {id,content}=result;
    const hide_id=Taro.getStorageSync("hide_id");
    if(hide_id<id){
      if(result.switch==="true"){
        Taro.showModal({
          title: '来自开发者的通知',
          content: content,
          showCancel:true,
          confirmText:"不再提醒",
          success: function (res) {
            if(res.confirm) {
              Taro.setStorageSync("hide_id",id);
            }
          }
        })
      }
    }
  },

})

export default model
