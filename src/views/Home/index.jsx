import React, { Component } from 'react'
import ContainerMain from '../../components/containerMain/index'
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
            {/* 内容区的ContainerMain包裹在andD的Layout中的Content里，所以渲染都往那里面走 */}
            <Content className="layout-main">
              <ContainerMain />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
