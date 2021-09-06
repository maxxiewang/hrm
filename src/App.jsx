import React, { Component } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Login from './views/Login/index'
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/" />
        </Switch>
      </HashRouter>
    )
  }
}
