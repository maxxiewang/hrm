import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default class RegisterForm extends Component {
  onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  regClick = () => {
    this.props.changeForm('login')
  }
  render() {
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
              name="usernames"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[{ required: true, message: '请输入密码!' }]}
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
                  <Button
                    type="danger"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    获取验证码
                  </Button>
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
