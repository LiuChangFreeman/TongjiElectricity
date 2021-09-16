import React, { Component } from 'react'
import Taro from "@tarojs/taro";
import { View,Text,Picker } from '@tarojs/components'
import { observer,inject } from 'mobx-react'

@inject('store')
@observer
class Search extends Component {

  async componentWillMount () {
    const {model} = this.props.store;
    await model.getCampus();
  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {model} = this.props.store;
    const {
      loading,
      temp_campus, temp_build, temp_center, temp_room,
      campus_list, build_list, center_list, room_list,
      viewstate_campus, viewstate_build, viewstate_center, viewstate_room
    }=model.state;
    return (
      <View className='page'>
        <View className="page__bd page__bd_spacing">

          <View className='weui-form__control-area'>

            <View className='weui-cells__group weui-cells__group_form'>
              <View className='weui-cells'>

                <View className='weui-cell weui-cell_active weui-cell_select weui-cell_select-after'>
                  <View className='weui-cell__hd'>
                    <Text className='weui-label' style='width: 3em'>校区</Text>
                  </View>
                  <View className='weui-cell__bd'>
                    <Picker
                      range={campus_list} mode="selector" rangeKey="name" value={0}
                      onChange={(e)=>{
                        const index=e.detail.value;
                        const campus=campus_list[index];
                        model.setCampus(campus);
                        const data={
                          "campus":campus.id,"viewstate":viewstate_campus
                        }
                        model.getBuild(data);
                      }}
                    >
                      <View className='weui-select'>{temp_campus?temp_campus.name:""}</View>
                    </Picker>
                  </View>
                </View>

                <View className='weui-cell weui-cell_active weui-cell_select weui-cell_select-after'>
                  <View className='weui-cell__hd'>
                    <Text className='weui-label' style='width: 3em'>楼栋</Text>
                  </View>
                  <View className='weui-cell__bd'>
                    <Picker
                      range={build_list} mode="selector" rangeKey="name" value={0}
                      onChange={(e)=>{
                        const index=e.detail.value;
                        const build=build_list[index];
                        model.setBuild(build);
                        const data={
                          "campus":temp_campus.id,"build":build.id,"viewstate":viewstate_build
                        }
                        model.getCenter(data);
                      }}
                    >
                      <View className='weui-select'>{temp_build?temp_build.name:""}</View>
                    </Picker>
                  </View>
                </View>

                <View className='weui-cell weui-cell_active weui-cell_select weui-cell_select-after'>
                  <View className='weui-cell__hd'>
                    <Text className='weui-label' style='width: 3em'>楼层</Text>
                  </View>
                  <View className='weui-cell__bd'>
                    <Picker
                      range={center_list} mode="selector" rangeKey="name" value={0}
                      onChange={(e)=>{
                        const index=e.detail.value;
                        const center=center_list[index];
                        model.setCenter(center);
                        const data={
                          "campus":temp_campus.id,"build":temp_build.id,"center":center.id,
                          "viewstate":viewstate_center
                        }
                        model.getRoom(data);
                      }}
                    >
                      <View className='weui-select'>{temp_center?temp_center.name:""}</View>
                    </Picker>
                  </View>
                </View>

                <View className='weui-cell weui-cell_active weui-cell_select weui-cell_select-after'>
                  <View className='weui-cell__hd'>
                    <Text className='weui-label' style='width: 3em'>房间</Text>
                  </View>
                  <View className='weui-cell__bd'>
                    <Picker
                      range={room_list} mode="selector" rangeKey="name" value={0}
                      onChange={(e)=>{
                        const index=e.detail.value;
                        const room=room_list[index];
                        model.setRoom(room);
                        const data={
                          "campus":temp_campus.id,"build":temp_build.id,"center":temp_center.id,"room":room.id,
                          "viewstate":viewstate_room
                        }
                      }}
                    >
                      <View className='weui-select'>{temp_room?temp_room.name:""}</View>
                    </Picker>
                  </View>
                </View>

              </View>
            </View>

            <View className='weui-flex'>

              <View className='weui-flex__item'>
                <View className='weui-btn weui-btn_default'
                  onClick={()=>{
                    if(temp_room!==null){
                      model.saveRoomInfo();
                      Taro.showToast({
                        title:"保存成功!",
                        icon:"none"
                      })
                    }
                    else{
                      Taro.showToast({
                        title:"请选择房间!",
                        icon:"none"
                      })
                    }
                  }}
                >
                  保存房间
                </View>
              </View>
            </View>

            <View className='weui-flex'>
              <View className='weui-flex__item'>
                <View className="weui-btn weui-btn_primary"
                  onClick={()=>{
                    Taro.showModal({
                      title: '确定要离开?',
                      content: '您所做的选择将不会自动保存',
                      success: function(res) {
                        if (res.confirm) {
                          Taro.redirectTo({url:'../index/index'});
                        }
                      }
                    })
                  }}
                >
                  返回首页
                </View>
              </View>
            </View>

          </View>
          <View className='weui-footer weui-footer_fixed-bottom'>
            <View className='weui-footer__text'>Copyright &copy; 2016-2021 tjservice.cn</View>
          </View>
        </View>
      </View>
    )
  }
}
export default Search;
