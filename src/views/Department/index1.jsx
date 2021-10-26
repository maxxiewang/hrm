import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, message, Input, Table, Switch, Modal } from 'antd'
import { GetList, Delete, Status } from '../../api/department'
import FormItem from 'antd/lib/form/FormItem'
export default class Department extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    loadingId: '',
    selectId: '',
    loadingTable: true,
    pageNumber: 1,
    pageSize: 10,
    columns: [
      {
        title: '部门名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, rowData) => {
          // console.log(rowData.status) // 通过rowData取到行数据
          return (
            <Form>
              <FormItem>
                <Input></Input>
              </FormItem>
            </Form>
          )
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, rowData) => {
          // console.log(rowData.status) // 通过rowData取到行数据
          return (
            <Form>
              <FormItem>
                <Input></Input>
              </FormItem>
            </Form>
          )
        },
      },
      {
        title: '人员数量',
        render: (text) => {
          return (
            <Form>
              <FormItem>
                <Input></Input>
              </FormItem>
            </Form>
          )
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, rowData) => {
          return (
            <div className="inline-button">
              <Button
                onClick={() => {
                  this.updateData(rowData.id)
                }}
                type="text"
                size="small"
                shape="round"
              >
                <Link
                  to={{
                    pathname: '/index/department/add',
                    state: { id: rowData.id },
                  }}
                >
                  编辑
                </Link>
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
    console.log('this.state.loadingTable', this.state.loadingTable)
    if (this.state.loadingTable) return
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
  // 编辑数据
  updateData = (id) => {}
  loadData = () => {
    this.setState({
      loadingTable: true,
    })
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
            loadingTable: false,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  onSwichSts = (data, checked) => {
    if (!data.id) return
    const queryData = {
      id: data.id,
      status: checked,
    }
    this.setState({
      loadingId: data.id,
    })
    setTimeout(() => {
      Status(queryData)
        .then((response) => {
          message.success(response.data.message)
          this.setState({
            loadingId: '',
          })
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            loadingId: '',
          })
        })
    }, 3000)
  }
  // 复选框
  onCheckBox = (val) => {
    this.setState({
      selectedRowKeys: val,
    })
  }
  // 点击确定删除
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    })
    Delete({ id: this.state.id })
      .then((res) => {
        message.success('删除成功')
        this.loadData()
        this.setState({
          visible: false,
          id: '',
          confirmLoading: false,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  delteData(id) {
    if (!id) return
    this.setState({
      visible: true,
      id: id,
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
          loading={this.state.loadingTable}
          bordered
        ></Table>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              visible: false,
              id: '',
            })
          }}
          confirmLoading={this.state.confirmLoading}
        >
          <p>确认删除？</p>
        </Modal>
      </Fragment>
    )
  }
}
