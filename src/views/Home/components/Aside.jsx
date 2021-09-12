import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './aside.scss'
import { Menu } from 'antd'
import { UserOutlined, SketchOutlined } from '@ant-design/icons'
// 路由
import Router from '../../../router/index'
const { SubMenu } = Menu
export default class Aside extends Component {
  // 有子菜单的情况
  renderSubMenu = (data) => {
    return (
      <SubMenu key={data.key} icon={<UserOutlined />} title={data.title}>
        {data.child &&
          data.child.map((item) => {
            return item.child && item.child.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item)
          })}
      </SubMenu>
    )
  }
  // 无子级菜单
  renderMenu = (data) => {
    return (
      <Menu.Item key={data.key} icon={<SketchOutlined />}>
        <Link to={data.key}>{data.title}</Link>
      </Menu.Item>
    )
  }
  render() {
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {Router &&
            Router.map((firstItem) => {
              return firstItem.child && firstItem.child.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem)
            })}
        </Menu>
      </Fragment>
    )
  }
}
