import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Spin
} from 'antd'

import { doLogin } from '../../actions/user'

const mapState = (state) => {
  return {
    isLogin: state.user.isLogin,
    isLoading: state.global.isLoading
  }
}

@connect(mapState, { doLogin })
@Form.create()
export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.doLogin(values);
      }
    })
  }
  render() {
    const {
      state = {}
    } = this.props.location
    const {
      from = "/admin/dashboard"
    } = state
    const { getFieldDecorator } = this.props.form
    return (
      this.props.isLogin
      ?
      <Redirect to={from} />
      :
      <Spin spinning={this.props.isLoading}>
        <h2 style={{
          textAlign: 'center',
          margin: '32px 0 16px'
        }}>Cow Plus 后台管理系统</h2>
        <Row>
          <Col span={8} offset={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item
                style={{textAlign: 'center'}}
              >
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    )
  }
}
