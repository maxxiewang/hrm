import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Code from '../../components/code'
import { Register } from '../../api/account'
// 表单自定义验证
import { validate_email } from '../../utils/validate'

export default class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    codeDisable: true,
    codeText: '获取验证码',
  }

  inputChange = (event) => {
    const val = event.target.value
    this.setState({ username: val })
  }
  onFinish = (values) => {
    if (values.password !== values.repasswords) {
      message.warning('两次密码不一致')
      return
    }
    const queryData = {
      username: values.username,
      password: values.password,
      code: values.codes,
    }
    console.log('queryData', queryData)
    Register(queryData)
      .then((response) => {
        console.log('res', response.data)
        message.success(response.data.message)
        this.regClick()
      })
      .catch((error) => {
        console.log(error)
      })
    console.log('Received values of form: ', values)
  }
  regClick = () => {
    this.props.changeForm('login')
  }
  // 消除input的点击冒泡
  preventBubble(e) {
    e.preventDefault()
  }
  // componentWillUnmount() {
  //   // message.destroy()
  //   this.setState = (state, callback) => {
  //     return
  //   }
  // }

  render() {
    const { username, codeDisable } = this.state
    const _this = this
    return (
      <div>
        <div className="form-header">
          <h4 className="column">注册</h4>
          <span onClick={this.regClick}>登录</span>
        </div>
        <div className="form-content">
          <Form
            name="regForm"
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
                onPressEnter={(e) => this.preventBubble(e)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                // { required: true, message: '不能超过20位!', max: 20 },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              name="repasswords"
              rules={[{ required: true, message: '请再次输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请再次输入密码"
              />
            </Form.Item>
            <Form.Item
              name="codes"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="验证码"
                  />
                </Col>
                <Col span={9}>
                  <Code username={username} codeDisable={codeDisable} />
                  {/* <Button
                    type="danger"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    获取验证码
                  </Button> */}
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
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
