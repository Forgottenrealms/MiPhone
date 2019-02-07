import React, { Component } from 'react'
import {
  Card,
  Button,
  Form, 
  Icon, 
  Input,
  message,
  DatePicker
} from 'antd'

import {saveUser} from '@/requests'

@Form.create()
export default class UserEdit extends Component {
  constructor () {
    super()
    this.state = {
      id: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values["date-time-picker"].format("x"))
      if (!err) {
        console.log('Received values of form: ', values);
        const data = Object.assign({},values,{
          id: this.state.id
        })
        saveUser(data)
        .then(resp => {
          if (resp.data.code === 200) {
            message.success(resp.data.msg)
            this.props.history.goBack()
          }
        })
      }
    });
  }

  render() { 
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
      <div>
        <Card
          title="编辑用户"
        > 
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
              {...formItemLayout}
              label="用户名"
            >
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input name!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="联系电话"
            >
              {
                getFieldDecorator('telephone', {
                  rules: [{ required: true, message: 'Please input telephone!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入联系电话" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="住址"
            >
              {
                getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Please input address!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入住址" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="积分"
            >
              {
                getFieldDecorator('integral', {
                  rules: [{ required: true, message: 'Please input integral!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入积分" />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
