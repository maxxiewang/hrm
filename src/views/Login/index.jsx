import React, { Component } from 'react'

import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import './index.scss'

export default class login extends Component {
  state = {
    formType: 'login',
  }
  changeForm = (formType) => {
    console.log('indexC', formType)
    this.setState({ formType: formType })
  }
  render() {
    return (
      <div className="form-wrap">
        <div>
          {this.state.formType === 'login' ? (
            <LoginForm changeForm={this.changeForm} />
          ) : (
            <RegisterForm changeForm={this.changeForm} />
          )}
        </div>
      </div>
    )
  }
}
