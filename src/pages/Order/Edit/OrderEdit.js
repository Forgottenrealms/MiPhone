import React, { Component,createRef } from 'react'
import { Card, Button, Form, Input, DatePicker,Select,message } from 'antd'
// import moment, { isMoment } from "moment"
import moment from "moment"
import E from 'wangeditor'
import {editArticle,saveArticle} from '../../../requests'
// import { constants } from 'zlib'
import  './OrderEdit.less'
const Option = Select.Option;
@Form.create()
export default class OrderEdit extends Component {
  constructor(){
    super()
    this.editorRef=createRef()
    this.state={
      editdata:{},
      content:''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //如果数据修改成功，就弹出修改成功的提示
        // message.success('编辑成功',3);
        saveArticle().then((res)=>
        {
          // console.log(res.data.code);
           if(res.data.code===200){
            const hint = res.data.msg;
            message.success(hint,3);
            this.props.history.goBack();
           }
        })
      }
    });
  }
  initEdit=()=>{
    this.props.form.setFieldsValue({
      Date: moment()
    })
    this.editorE = new E(this.editorRef.current)
    this.editorE.customConfig.onchange =(html)=> {
      // html 即变化之后的内容,把改变的内容赋值到content里面去
      this.setState(
        {
          content:html
        })
  }
    this.editorE.customConfig.zIndex = 100
    this.editorE.create()
  }
  fetchArticles = () => {
    editArticle().then(res => {
        if (res.status === 200) {
          this.setState({
            editdata:res.data.data,
            content:res.data.data.content,
          },()=>{
            //在修改了state之后再执行，这时候的state就是修改之后的
            this.editorE.txt.html(res.data.data.content);
          })
        }
      });
      //异步的   
  }
  componentDidMount() {
    this.initEdit()
    this.fetchArticles()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    //加载订单列表页面的数据，然后通过结构赋值来渲染
     let {customer,price,createAT,shipTo,Status}=this.state.editdata;
    return (
      <Card
        title="订单详情"
        style={{minHeight:1000}}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="购买人姓名"
          >
            {getFieldDecorator('Customer', {
              rules: [
                { required: true, message: '请输入购买人的名字' },
                { pattern:/^([\u4e00-\u9fa5]){2,7}$/,message:'输入要求中文'}],
            })(
              <Input placeholder={customer} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="收货人姓名"
          >
            {getFieldDecorator('shipTo', {
              rules: [
                { required: true, message: '请输入收货人的名字' },
                { pattern:/^([\u4e00-\u9fa5]){2,7}$/,message:'输入要求中文'}],
            })(
              <Input placeholder={shipTo} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="商品价格"
          >
            {getFieldDecorator('Price', {
              rules: [{ required: true, message: '价格' },
                      { pattern:/^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i,message:'输入要求数字'}],
            })(
              <Input placeholder={price} />
            )}
          </Form.Item>
          <Form.Item className='setDateStyle'
            {...formItemLayout}
            label="日期"
          >
            {getFieldDecorator('Date', {
              //这里也可以实现初始化操作
              initialValue:moment(),
              //这里的搭配好像是一个校验规则，搭配一个message提示
              rules: [
                { required: true, message: '日期' }
                // validator这里如果使用了自定义的校验规则的话，前面定义的rule就不起作用--function(rule, value, callback)
              ],
            })(
              <DatePicker className="datePickerStyle" showTime format="YYYY-MM-DD HH:mm:ss" />

            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="状态"
          >
            {getFieldDecorator('Status', {
              rules: [{ required: true, message: '状态' }],
            })(
              <Select span={24} allowClear={true} placeholder={Status}>
              <Option value="pedding">pedding</Option>
              <Option value="On Hold">On Hold</Option>
              <Option value="Closed">Closed</Option>
              <Option value="Fraud">Fraud</Option>
            </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="正文"
          >
            {getFieldDecorator('content', {
              initialValue: this.state.content
            })(
              <div ref={this.editorRef}></div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存
          </Button>
          </Form.Item>
        </Form>
      </Card>

    )
  }
}
