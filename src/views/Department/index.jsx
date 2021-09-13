import React, { Component, Fragment } from 'react'
import { Button, Form, Input, Table, Switch } from 'antd'
import { GetList, Delete } from '../../api/department'
export default class Department extends Component {
  state = {
    pageNumber: 1,
    pageSize: 10,
    columns: [
      { title: '部门名称', dataIndex: 'name', key: 'name' },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, rowData) => {
          // console.log(rowData.status) // 通过rowData取到行数据
          return (
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked={rowData.status}
            />
          )
        },
      },
      { title: '人员数量', dataIndex: 'number', key: 'number' },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, rowData) => {
          return (
            <div className="inline-button">
              <Button type="text" size="small" shape="round">
                操作
              </Button>
              <Button
                onClick={() => {
                  this.delteData(rowData.id)
                }}
                type="text"
                danger
                size="small"
                shape="round"
              >
                删除
              </Button>
            </div>
          )
        },
      },
    ],
    data: [],
    keyWord: '',
    selectedRowKeys: [],
  }
  onFinish = (value) => {
    this.setState({
      keyWord: value.name,
      pageNumber: 1,
      pageSize: 10,
    })
    this.loadData()
  }
  // 数据加载常用的勾子
  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    const data = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      name: this.state.keyWord,
    }
    GetList(data)
      .then((response) => {
        const resData = response.data.data
        if (resData.data) {
          this.setState({
            data: response.data.data.data,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 复选框
  onCheckBox = (val) => {
    this.setState({
      selectedRowKeys: val,
    })
  }
  delteData = (id) => {
    Delete(id)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const rowSelection = {
      onChange: this.onCheckBox,
    }
    return (
      <Fragment>
        <Form
          style={{ marginBottom: '25px' }}
          layout="inline"
          onFinish={this.onFinish}
        >
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
        ></Table>
      </Fragment>
    )
  }
}
