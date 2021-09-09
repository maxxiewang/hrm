import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// 表单自定义验证
import { validate_email } from '../../utils/validate'
// API
import { Login } from '../../api/account'
import Code from '../../components/code'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    codeText: '获取验证码',
  }
  onFinish = (values) => {
    console.log('Received values of form: ', values)
    Login(values)
      .then((response) => {})
      .catch((error) => {
        console.log(error)
      })
  }
  // 注册与登陆切换
  regClick = () => {
    this.props.changeForm('reg')
  }
  inputChange = (event) => {
    const val = event.target.value
    this.setState({ username: val })
  }
  // 发送验证码
  // getCode = () => {
  //   if (!this.state.username) {
  //     message.warning('用户名不能为空')
  //     return
  //   }
  //   console.log('getCode', this.state)
  //   const queryData = {
  //     username: this.state.username,
  //   }
  //   // this.setState({ loadingCode: true, codeDisable: true, codeText: '发送中' })
  //   GetCode(queryData)
  //     .then((response) => {
  //       this.countDown()
  //       console.log('res', response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       this.setState({
  //         loadingCode: false,
  //         codeDisable: false,
  //         codeText: '重新获取',
  //       })
  //     })
  // }

  render() {
    const { username } = this.state
    const _this = this
    return (
      <div>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.regClick}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            name="loginForm"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    console.log(getFieldValue('username'))
                    if (validate_email(value)) {
                      _this.setState({ codeDisable: false })
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('邮箱格式不正确!'))
                  },
                }),
              ]}
            >
              <Input
                onChange={this.inputChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                // ({ getFieldValue }) => ({
                //   validator(_, value) {
                //     console.log(getFieldValue('username')) // 取密码，也可以取别的
                //     if (!value || getFieldValue('password') === value) {
                //       return Promise.resolve()
                //     }
                //     return Promise.reject(new Error('密码错误!'))
                //   },
                // }),
                // { pattern: validate_password, message: '密码大6位，数字+字母' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Code"
                  />
                </Col>
                <Col span={9}>
                  {/* <Button
                    type="danger"
                    className="login-form-button"
                    block
                    loading={loadingCode}
                    onClick={this.getCode}
                    disabled={codeDisable}
                  >
                    {codeText}
                  </Button> */}
                  {/* 获取验证码组件 */}
                  <Code username={username} />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
