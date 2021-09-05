import React, { Component } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { cars: 'benz' }
  }
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Login} path="/login" />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
