import React, { Component } from 'react'
import {
  Card,
  Button,
  Form, 
  Icon, 
  Input,
  DatePicker
} from 'antd'

import moment from 'moment'
import E from 'wangeditor'

@Form.create()
export default class ProductEdit extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values["date-time-picker"].format("x"))
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  // 初始化文本编辑器
  initialEditor = () => {
    const editor = new E('#data-editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      "date-time-picker": moment()
    })
    this.initialEditor()
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
          title="编辑商品"
        > 
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
              {...formItemLayout}
              label="商品型号"
            >
              {
                getFieldDecorator('productStyle', {
                  rules: [{ required: true, message: 'Please input productStyle!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机型号" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="价格"
            >
              {
                getFieldDecorator('Price', {
                  rules: [{ required: true, message: 'Please input price!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机价格" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="库存"
            >
              {
                getFieldDecorator('Amount', {
                  rules: [{ required: true, message: 'Please input amount!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机库存" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="更新时间"
            >
              {getFieldDecorator('date-time-picker', config)(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简介"
            >
              {
                getFieldDecorator('data-editor', {
                  rules: [{ required: true, message: 'Please input content!' }],
                })(
                  <div id=""data-editor></div>
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
