import React, { Component } from 'react'
import Taro from "@tarojs/taro";
import {View, Text, Input, Image} from '@tarojs/components'
import {observer,inject} from 'mobx-react'
import {encrypt,getDevice} from '../../utils/utils'
import {loginTongXinYun,logoffTongXinYun} from '../../utils/services'
import model from "../../store/model";
import "./login.css";

@inject('store')
@observer
class Login extends Component {

  state={
    account:"",
    password:"",
    loading:false
  }

  componentWillMount () { }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onLogin=async()=>{
    const data=getDevice();
    const {account,password}=this.state;
    if(password.length===0){
      Taro.showToast({
        title:"不合法的密码!",
        icon:"none"
      })
      return
    }
    this.setState({
      loading:true
    })
    data["userName"]=account;
    data["password"]=encrypt(account,password);
    console.log(data);
    try {
      const result=await loginTongXinYun(data);
      if(result.success){
        let result_data=result.data;
        result_data["device_id"]=data["deviceId"];
        model.setUser(result_data);
        Taro.showToast({
          title:"登录成功!",
          icon:"success"
        })
      }else{
        Taro.showToast({
          title:result.error,
          icon:"none"
        })
      }
    }
    catch (e){
      Taro.showToast({
        title:"登陆异常!",
        icon:"none"
      })
    }
    this.setState({
      loading:false
    })
  }

  onLogoff=async()=>{
    // eslint-disable-next-line no-shadow
    const {model}=this.props.store;
    const {user}=model.state;
    try {
      const result=await logoffTongXinYun(user);
      if(result.success){
        model.logOff();
        Taro.showToast({
          title:"注销成功!",
          icon:"success"
        })
      }else{
        Taro.showToast({
          title:result.error,
          icon:"none"
        })
      }
    }
    catch (e){
      Taro.showToast({
        title:"注销异常!",
        icon:"none"
      })
    }
  }

  render () {
    const {loading}=this.state;
    // eslint-disable-next-line no-shadow
    const {model}=this.props.store;
    const {user}=model.state;
    return (
      <View className='page'>
        <View className="weui-form">
          <View className="weui-form__text-area">
            <Text className="weui-form__title">校园钱包</Text>
            <View className="weui-form__desc">使用您的同心云账号进行电费查询</View>
          </View>
          <View className="weui-form__control-area">
            {
              !user&&
              <View className="weui-cells__group weui-cells__group_form">
                <View className="weui-cells__title">同心云登录</View>
                <View className="weui-cells weui-cells_form">
                  <View className="weui-cell weui-cell_active">
                    <View className="weui-cell__hd">
                      <Text className="weui-label">账号</Text>
                    </View>
                    <View className="weui-cell__bd">
                      <Input
                        className="weui-input" placeholder="填写同心云账号" placeholder-class="weui-input__placeholder"
                        onInput={(e)=>{
                          const account=e.detail.value;
                          this.setState({
                            account
                          });
                        }}
                      />
                    </View>
                  </View>
                  <View className="weui-cell weui-cell_active">
                    <View className="weui-cell__hd">
                      <Text className="weui-label">密码</Text>
                    </View>
                    <View className="weui-cell__bd">
                      <Input
                        className="weui-input" type="password" placeholder="填写账号密码" placeholder-class="weui-input__placeholder"
                        onInput={(e)=>{
                          const password=e.detail.value;
                          this.setState({
                            password
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            }
            {
              user&&
                <View className="avatar">
                  <View className="weui-flex">
                    <Image src={user.photoUrl} style="width: 50px; height: 50px; display: block; margin-right: 10px;" />
                    <View className="weui-cell__bd">
                      <View>{user.name}</View>
                      <View style="font-size: 13px; color: #888;">{user.phone}</View>
                    </View>
                  </View>
                </View>
            }
          </View>

          <View className="weui-form__opr-area">
            {
              !user&&
              <View className="weui-btn weui-btn_primary"
                onClick={async ()=>{
                  await this.onLogin();
                }}
              >
                登录
              </View>
            }
            {
              user&&
              <View className="weui-btn weui-btn_warn"
                onClick={async ()=>{
                  await this.onLogoff();
                }}
              >
                注销
              </View>
            }
            <View className="weui-btn weui-btn_default"
              onClick={()=>{
                Taro.redirectTo({url:'../index/index'});
              }}
            >
              返回
            </View>
          </View>
        </View>
        <View className='weui-footer weui-footer_fixed-bottom'>
          <View className='weui-footer__Text'>Copyright &copy; 2016-2021 liuchangfreeman.xyz</View>
        </View>
      </View>
    )
  }
}
export default Login;
