import React, { Component } from 'react'
import ContainerMain from '../../components/containerMain/index'
import './layout.scss'
import Aside from './components/Aside'
import LayoutHeader from './components/Header'
import { Layout } from 'antd'
const { Header, Content, Sider } = Layout

export default class Home extends Component {
  state = {
    collapsed: false,
  }
  toogleChange = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <div>
        <Layout className="layout-wrap">
          <Sider width="250px" collapsed={this.state.collapsed}>
            <Aside />
          </Sider>
          <Layout>
            <Header className="layout-header">
              <LayoutHeader
                collapsed={this.state.collapsed}
                toogleChange={this.toogleChange}
              />
            </Header>
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
