import React, { Component } from 'react'
import {
    Card,
    Button,
    Form, 
    Icon, 
    Input,
    message,
  } from 'antd'

  import {saveStaff} from '@/requests'

@Form.create()
export default class StaffEdit extends Component {
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
        saveStaff(data)
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
          title="编辑职工"
        > 
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
              {...formItemLayout}
              label="员工编号"
            >
              {
                getFieldDecorator('id', {
                  rules: [{ required: true, message: 'Please input id!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入员工编号" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="员工姓名"
            >
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input name!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入员工姓名" />
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
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入住址" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="入职日期"
            >
              {
                getFieldDecorator('entrydate', {
                  rules: [{ required: true, message: 'Please input entrydate!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入入职日期" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="管理权限"
            >
              {
                getFieldDecorator('authority', {
                  rules: [{ required: true, message: 'Please input authority!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="true或false" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="星期一"
            >
              {
                getFieldDecorator('Mon', {
                  rules: [{ required: true, message: 'Please input attendance!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入考勤情况" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="星期二"
            >
              {
                getFieldDecorator('Tues', {
                  rules: [{ required: true, message: 'Please input attendance!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入考勤情况" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="星期三"
            >
              {
                getFieldDecorator('Wed', {
                  rules: [{ required: true, message: 'Please input attendance!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入考勤情况" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="星期四"
            >
              {
                getFieldDecorator('Thur', {
                  rules: [{ required: true, message: 'Please input attendance!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入考勤情况" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="星期五"
            >
              {
                getFieldDecorator('Fri', {
                  rules: [{ required: true, message: 'Please input attendance!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入考勤情况" />
                )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="星期六"
            >
              {
                getFieldDecorator('Sat', {
                  rules: [{ required: true, message: 'Please input attendance!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入考勤情况" />
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
