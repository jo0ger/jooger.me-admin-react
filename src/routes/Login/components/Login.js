import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Input, Icon } from 'antd'
import styles from '../assets/Login.styl'

const FormItem = Form.Item

export class Login extends Component {

  state = {
    loginLoading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { loginLoading } = this.state
    
    return (
      <div className={styles.page_login}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <span className={styles.title}>JOOGER-ADMIN</span>
          </div>
          <div className={styles.login_form}>
            <form>
              <FormItem hasFeedback>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}size="large" onPressEnter={this.handleSubmit} placeholder="Username" />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} size="large" type="password" onPressEnter={this.handleSubmit} placeholder="Password" />)}
              </FormItem>
              <Row>
                <Button type="primary" size="large" onClick={this.handleSubmit} loading={loginLoading}>
                  Sign in
                </Button>
              </Row>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
