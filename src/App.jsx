import React, { Component } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Login from './views/Login/index'
import Home from './views/Home'
// 私有化路由，用于权限判断
import PrivateRouter from './components/privateRouter/index'
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route render={() => <Login />} exact path="/" />
          <PrivateRouter component={Home} path="/index" />
        </Switch>
      </HashRouter>
    )
  }
}
