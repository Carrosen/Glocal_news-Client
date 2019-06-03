import React, { Component } from 'react'
import { Form, Button, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signInUser } from '../reduxTokenAuthConfig'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: '',
    message: '',
    errorsLogin: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { history, signInUser } = this.props
    const {
      email,
      password
    } = this.state
    signInUser({ email, password })
      .then(response => {
        this.setState({ message: true })
        setTimeout(function () { history.push('/') }, 3000)
      }).catch(error => {
        this.setState({
          errorsLogin: error.response.data.errors[0],
          message: false
        })
      })
  }

  render() {

    let message
    let messageErrors

    if (this.state.message === true) {
      message = (
        <>
          <br />
          <Message color="green">
            <p>You have succesfully logged in. Wait to be redirected to the main page.</p>
          </Message>
        </>
      )
    }

    if (this.state.message === false) {
      messageErrors = (
        <>
          <br />
          <Message color="red">
            <p>{this.state.errorsLogin}</p>
          </Message>
        </>
      )
    }

    return (
      <Container>
        <p>{message}</p>
        <p>{messageErrors}</p>
        <Form id="login-form" onSubmit={this.onSubmit}>
          <Form.Input
            required
            id="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            placeholder="Email"
          />

          <Form.Input
            required
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            placeholder="Password"
          />

          <Button id="login">Login</Button>

        </Form>

      </Container>
    )
  }


}

export default connect(
  null,
  { signInUser },
)(LoginForm)
