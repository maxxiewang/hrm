import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './aside.scss'
import { Menu } from 'antd'
import { UserOutlined, SketchOutlined } from '@ant-design/icons'
// 路由
import Router from '../../../router/index'

const { SubMenu } = Menu
class Aside extends Component {
  state = {
    selectedKeys: [],
    openKeys: [],
  }
  // 放这个勾子里面是对的？？
  componentDidMount() {
    const pathName = this.props.location.pathname
    const menuKey = pathName.split('/').slice(0, 3).join('/')
    this.setState({
      selectedKeys: [pathName],
      openKeys: [menuKey],
    })
  }
  /** 选择菜单  */
  selectMenu = ({ item, key, keyPath, domEvent }) => {
    const menuHigh = {
      selectedKeys: key,
      openKeys: keyPath[keyPath.length - 1],
    }
    this.selectMenuHigh(menuHigh)
  }
  //选择展开
  openMenu = (openKeys) => {
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]],
    })
  }
  /** 菜单高光 */
  selectMenuHigh = ({ selectedKeys, openKeys }) => {
    this.setState({
      selectedKeys: [selectedKeys],
      openKeys: [openKeys],
    })
  }
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
    const { selectedKeys, openKeys } = this.state
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <Menu
          mode="inline"
          theme="dark"
          onClick={this.selectMenu}
          onOpenChange={this.openMenu}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
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
export default withRouter(Aside)
