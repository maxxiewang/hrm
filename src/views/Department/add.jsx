import React, { Component } from 'react'
import { Form, Input, Button, InputNumber, Radio, message } from 'antd'

import { Add } from '../../api/department'
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
}
export default class AddDepartment extends Component {
  state = {
    status: true,
    loading: false,
  }
  onFinish = (values) => {
    this.setState({ loading: true })
    Add(values)
      .then((response) => {
        message.success(response.data.message)
        this.setState({ loading: false })
        this.refs.form.resetFields()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: false })
      })
  }
  onChangeRadio = (val) => {
    console.log('radio', val)
  }
  render() {
    return (
      <Form
        ref="form"
        {...layout}
        name="control-hooks"
        onFinish={this.onFinish}
        initialValues={{ status: this.state.status, number: 1 }}
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
          <InputNumber min={1} />
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
        <Form.Item
          name="content"
          wrapperCol={{
            offset: 2,
            span: 20,
          }}
        >
          <Button loading={this.state.loading} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
