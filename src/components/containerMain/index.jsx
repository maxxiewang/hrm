import React from 'react'
import { Switch } from 'react-router-dom'
// 导入组件
import User from '../../views/User'
// 私有路由
import PrivateRouter from '../privateRouter/index'

class ContainerMain extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <PrivateRouter exact component={User} path="/index/user/list" />
        </Switch>
      </div>
    )
  }
}
export default ContainerMain