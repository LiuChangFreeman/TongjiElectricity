import React, { Component } from 'react'
import Taro from "@tarojs/taro";
import {View,Text,Picker,Input} from '@tarojs/components'
import {observer,inject} from 'mobx-react'
import {getFormatDate} from '../../utils/utils'
import {getRecord} from '../../utils/services'

@inject('store')
@observer
class Record extends Component {
  state={
    loading:false,
    list:[],
    cookie:null,
    start:getFormatDate(1),
    end:getFormatDate(0),
    pages:0,
    current:0
  }
  componentWillMount () { }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom(){
    this.getNext();
  }

  async getData(){
    const {start,end}=this.state;
    const {model} = this.props.store;
    const {room_info}=model.state;
    this.setState({
      loading: true
    })
    const data_record={
      campus: room_info.campus.id,
      build: room_info.build.id,
      center: room_info.center.id,
      room: room_info.room.id,
      start: start,
      end: end,
      viewstate: room_info.viewstate
    }
    try{
      const result=await getRecord(data_record);
      const{data,cookie,pages}=result;
      this.setState({
        list: data,
        cookie,
        pages,
        loading: false
      })
    }
    catch (e) {
      this.setState({
        loading: false
      })
    }
  }

  async getNext(){
    const {cookie,pages,current,list}=this.state;
    if(current>pages){
      Taro.showToast({
        title:"已达最大页",
        icon:"none"
      })
    }
    this.setState({
      loading: true
    })
    const data_record={
      cookie: cookie,
      page: current + 1
    }
    try{
      const result=await getRecord(data_record);
      const {data}=result;
      if(data){
        this.setState({
          list:list.concat(data),
          current: current+1,
          cookie:result.cookie
        })
      }
    }
    catch (e) {

    }
    this.setState({
      loading: false
    })
  }

  render () {
    const {loading,list,start,end}=this.state;
    return (
      <View className='page'>
        <View className='page__bd page__bd_spacing'>
          <View className="weui-cells__title">选择日期(间隔不应超过一年)</View>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">起始日期</View>
              </View>
              <View className="weui-cell__bd">
                <Picker mode="date" start={getFormatDate(2)} end={getFormatDate(0)}
                  onChange={(e)=>{
                    const date=e.detail.value;
                    this.setState({
                      start: date
                    })
                  }}
                >
                  <View className="weui-input">{start}</View>
                </Picker>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">结束日期</View>
              </View>
              <View className="weui-cell__bd">
                <Picker mode="date" start={getFormatDate(2)} end={getFormatDate(0)}
                  onChange={(e)=>{
                    const date=e.detail.value;
                    this.setState({
                      end: date
                    })
                  }}
                >
                  <View className="weui-input">{end}</View>
                </Picker>
              </View>
            </View>
          </View>
          <View className='weui-flex'>
            <View className='weui-flex__item'>
              <View className='weui-btn weui-btn_mini weui-btn_default'
                onClick={()=>{
                  Taro.redirectTo({url:'../index/index'});
                }}
              >
                返回主页
              </View>
            </View>
            <View className='weui-flex__item'>
              <View className='weui-btn weui-btn_mini weui-btn_primary'
                onClick={async ()=>{
                  await this.getData();
                }}
              >
                查询记录
              </View>
            </View>
          </View>

          <View className="weui-form-preview">
            {
              list.map((item,index)=>{
                return (
                  <View className="weui-form-preview__bd">
                    <View className="weui-form-preview__item">
                      {
                        Object.keys(item).map((key,key_index)=>{
                          return(
                            <View>
                              <View className="weui-form-preview__label">{key}</View>
                              <View className="weui-form-preview__value">{item[key]}</View>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                )
              })
            }
          </View>
          {
            loading&&
            <View className="weui-loadmore">
              <View className="weui-loading" />
              <View className="weui-loadmore__tips">正在查询</View>
            </View>
          }
        </View>
      </View>
    )
  }
}
export default Record;
