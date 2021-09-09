import React, { Component } from 'react'
import { Button, message } from 'antd'
import { GetCode } from '../../api/account'
export default class Code extends Component {
  /* 
    关于是否需要用constructor构造器来初始化，
    如果需要在初始化时，把props传过来东西，放到state里，这么写就方便，但只执行一次
    但其实写在生命周期勾子里面也是一样的
  */
  state = {
    codeDisable: true,
    loadingCode: false,
    codeText: '获取验证码',
  }
  // 利用17新的生命周期钩子
  static componentWillReceiveProps(value) {
    console.log('componentWillReceiveProps', value)
  }
  // 这个新钩子挺有意思，是否更新返回布尔值
  shouldComponentUpdate(value) {
    console.log('shouldComponentUpdate', value)
    return true
  }
  // 获取验证码
  getCode = () => {
    if (!this.props.username) {
      message.warning('用户名不能为空')
      return
    }
    console.log('getCode', this.state)
    const queryData = {
      username: this.state.username,
    }
    // this.setState({ loadingCode: true, codeDisable: true, codeText: '发送中' })
    GetCode(queryData)
      .then((response) => {
        this.countDown()
        console.log('res', response)
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          loadingCode: false,
          codeDisable: false,
          codeText: '重新获取',
        })
      })
  }

  /* 倒计时函数 */
  countDown = () => {
    let sec = 60
    this.setState({
      codeDisable: true,
      codeText: `${sec}S`,
    })
    let timer = setInterval(() => {
      sec--
      if (sec <= 57) {
        clearInterval(timer)
        this.setState({
          codeDisable: false,
          codeText: '重新获取',
        })
        return
      }
      this.setState({ codeText: `${sec}S` })
    }, 1000)
  }
  render() {
    const { codeText } = this.state
    return (
      <div>
        <Button
          type="danger"
          className="login-form-button"
          block
          // loading={loadingCode}
          onClick={this.getCode}
          // disabled={codeDisable}
        >
          {codeText}
        </Button>
      </div>
    )
  }
}
