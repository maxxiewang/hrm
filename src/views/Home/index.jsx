import React, { Component } from 'react'
import './layout.scss'
import Aside from './components/Aside'
import { Layout } from 'antd'
const { Header, Content, Sider } = Layout

export default class Home extends Component {
  render() {
    return (
      <div>
        <Layout className="layout-wrap">
          <Sider width="250px">
            <Aside />
          </Sider>
          <Layout>
            <Header className="layout-header">头部</Header>
            <Content className="layout-main">内容区</Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
