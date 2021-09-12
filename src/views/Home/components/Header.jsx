import React, { Component, Fragment } from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import './header.scss'
export default class Header extends Component {
  state = {
    collapsed: this.props.collapsed,
  }
  change = () => {
    this.props.toogleChange()
  }
  render() {
    return (
      <Fragment>
        <div className="headerWarp">
          <span className="collapsed-icon" onClick={this.change}>
            <MenuFoldOutlined />
          </span>
        </div>
      </Fragment>
    )
  }
}
