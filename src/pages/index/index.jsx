/* eslint-disable jsx-quotes */
import React, { Component } from 'react'
import {
  View,Text,Switch,Ad,
  MatchMedia
} from '@tarojs/components'
import Taro from '@tarojs/taro';
import { observer, inject } from 'mobx-react'

import './index.css'

@inject('store')
@observer
class Index extends Component {

  componentWillMount () {

  }

  componentDidMount () {
    const {model} = this.props.store;
    const{auto,room_info}=model.state;
    if(room_info&&auto){
      model.searchMoney();
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {model} = this.props.store;
    const{auto,room_info,user,mode,loading,money}=model.state;
    return (
      <View className='page'>
        <View className='page__bd page__bd_spacing'>

          <View className='weui-flex'>
            <View className='weui-flex__item'>
              <View className='weui-btn weui-btn_mini weui-btn_default'
                onClick={()=>{
                  Taro.navigateTo({url:'../search/search'});
                }}
              >
                选择房间
              </View>
            </View>
            {
              process.env.TARO_ENV !== 'h5'&&
              <View className='weui-flex__item'>
                <View className="weui-btn weui-btn_mini weui-btn_primary"
                  onClick={()=>{
                    Taro.navigateTo({url:'../login/login'});
                  }}
                >
                  使用新版
                </View>
              </View>
            }
            {
              room_info!==null&&
              <View className='weui-flex__item'>
                <View className='weui-btn weui-btn_mini weui-btn_default'
                  onClick={()=>{
                    Taro.showModal({
                      title: '即将发起拨号',
                      content: '是否联系电控负责人【时工】?',
                      success: function (res) {
                        if(res.confirm) {
                          Taro.makePhoneCall({
                            phoneNumber: '18916406026',
                          })
                        }
                      }
                    })
                  }}
                >
                  联系电控
                </View>
              </View>
            }
          </View>

          {
            room_info!==null&&
            <View className="weui-cell weui-cell_active weui-cell_switch">
              <View className="weui-cell__bd">自动查询余额</View>
              <View className="weui-cell__ft">
                <Switch checked={auto} onChange={(e)=>{
                  const flag=e.detail.value;
                  model.setAuto(flag);
                }}
                />
              </View>
            </View>
          }

          <View className='weui-form-preview'>
            {
              room_info !== null &&
                <View>
                  <View className='weui-form-preview__hd'>
                    {
                      loading&&
                      <View className="weui-loadmore">
                        <View className="weui-loading" />
                        <View className="weui-loadmore__tips">正在查询</View>
                      </View>
                    }
                    {
                      !loading&&
                      <View className='weui-form-preview__item'>
                        <Text className='weui-form-preview__label'>电费金额</Text>
                        <Text className='weui-form-preview__value'>{
                          money===null?"暂无数据":money
                        }</Text>
                      </View>
                    }
                  </View>
                  <View className='weui-form-preview__bd'>
                  <View className='weui-form-preview__item'>
                  <Text className='weui-form-preview__label'>校区</Text>
                  <Text className='weui-form-preview__value'>{room_info.campus.name}</Text>
                  </View>
                  <View className='weui-form-preview__item'>
                  <Text className='weui-form-preview__label'>楼栋</Text>
                  <Text className='weui-form-preview__value'>{room_info.build.name}</Text>
                  </View>
                  <View className='weui-form-preview__item'>
                  <Text className='weui-form-preview__label'>楼层</Text>
                  <Text className='weui-form-preview__value'>{room_info.center.name}</Text>
                  </View>
                  <View className='weui-form-preview__item'>
                  <Text className='weui-form-preview__label'>房间</Text>
                  <Text className='weui-form-preview__value'>{room_info.room.name}</Text>
                  </View>
                  </View>
                </View>
            }
            <View className="weui-cell weui-cell_switch">
              <View className="weui-cell__ft" style='font-size:31rpx;color:red;'>余额不会实时更新，请以充值记录到账为准</View>
            </View>
            {
              room_info === null &&
              <View>
                <View className='weui-form-preview__hd'>
                  <View className='weui-form-preview__item'>
                    <Text className='weui-form-preview__label'>电费金额</Text>
                    <Text className='weui-form-preview__value'>请选择房间</Text>
                  </View>
                </View>
              </View>
            }
            {
              room_info !== null &&
              <View className='weui-form-preview__ft'>
                <View
                  className='weui-form-preview__btn weui-form-preview__btn_primary'
                  onClick={() => {
                    Taro.navigateTo({url: '../record/record'});
                  }}
                >
                  充值记录
                </View>

                <View
                  className='weui-form-preview__btn weui-form-preview__btn_primary'
                  onClick={() => {
                    model.searchMoney();
                  }}
                >
                  查询余额
                </View>

                <View
                  className='weui-form-preview__btn weui-form-preview__btn_primary'
                  onClick={() => {
                    Taro.navigateTo({url: '../usage/usage'});
                  }}
                >
                  用电记录
                </View>
              </View>
            }
          </View>

          <View className='weui-footer weui-footer_fixed-bottom'>
            {
              process.env.TARO_ENV === 'weapp'&&
              <MatchMedia min-height="600">
                <View className="ad_container">
                  <Ad unitId="adunit-e2e275bd733e13a5" />
                </View>
              </MatchMedia>
            }
            <View className='weui-footer__Text'>Copyright &copy; 2016-2021 tjservice.cn </View>
            <View className='weui-footer__Text'>Powered by
              {
                process.env.TARO_ENV === 'h5'&&
                // eslint-disable-next-line react/forbid-elements
                <a href="https://webify.cloudbase.net"> CloudBase Webify</a>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default Index;
