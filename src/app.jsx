import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react'
import './styles/weui.wxss'
import './app.css'
import model from './store/model'

const store = {
  model
};

export default class App extends Component {
  componentDidMount () {
    model.initData();
    model.getPublic();
    // const data={
    //   "urlParam":"",
    //   "openToken":model.state.user.token,
    //   "appid":"200019",
    //   "mid":"104",
    //   "ua":""
    // }
    // model.getTicket(data);
    console.log(model.state.user);
    if(process.env.TARO_ENV === 'weapp') {
      const updateManager = Taro.getUpdateManager()
      updateManager.onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (result) {
            if (result.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}
