import React, { Component } from 'react'
import { Form, Input, Button, InputNumber, Radio, message } from 'antd'

import { Add } from '../../api/department'
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}
export default class AddDepartment extends Component {
  state = {
    status: true,
  }
  onFinish = (values) => {
    console.log(values)
    Add(values)
      .then((response) => {
        message.success(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  onChangeRadio = (val) => {
    console.log('radio', val)
  }
  render() {
    console.log('this.state.status', this.state.status)
    return (
      <Form
        {...layout}
        name="control-hooks"
        onFinish={this.onFinish}
        initialValues={{ status: this.state.status, number: 0 }}
      >
        <Form.Item
          label="部门名称"
          name="name"
          rules={[
            {
              required: true,
              message: '部门名称必填!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="人员数量"
          name="number"
          rules={[
            {
              required: true,
              message: '人员数量必填!',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="是否启用"
          name="status"
          rules={[
            {
              required: true,
              message: 'need!',
            },
          ]}
        >
          <Radio.Group onChange={this.onChangeRadio} value={true}>
            <Radio value={true}>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="描述"
          name="content"
          rules={[
            {
              required: true,
              message: '描述必填!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="content">
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
