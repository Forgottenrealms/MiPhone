import React, { Component,createRef } from 'react'
import {
  List, message, Avatar, Spin, Comment, Icon, Tooltip, Card,Modal,notification,Button,Form,DatePicker,Input
} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import './GuestbookView.less'
import InfiniteScroll from 'react-infinite-scroller';
// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const fakeDataUrl = 'http://localhost:8000/api/data/getComment';
@Form.create()
export default class GuestbookView extends Component {
  constructor(){
    super(),
    this.suibianxie=createRef()
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      visible:false,
      boolSend:false,
      id:null,
      visible1:false,
    }
  }
  componentDidMount() {
    this.fetchData((res) => {
      console.log(res.data);
      this.setState({
        data: res.data,
        boolSend:false
      });
    });
  }
  //实现点赞的喜欢功能
  like = (id) => {
  // console.log(likes,dislike,action);
  console.log(this.state.data);
      this.setState({
        data:this.state.data.map(item=>{
          if(item.id==id){
            item.likes=item.clickLike?item.likes+1:item.likes;
            // item.dislikes=0;
            item.action='liked';
            item.clickLike=false;
          }
          return item;
        })
      })  
  }
  //实现点赞的不喜欢功能
  dislike = (id) => {
    console.log(this.state.data);
    this.setState({
      data:this.state.data.map(item=>{
        if(item.id==id){
          // item.likes=0;
          item.dislikes=item.clickLike?item.dislikes+1:item.dislikes;
          item.action='disliked';
          item.clickLike=false;
        }
        return item;
      })
    })
  }
applyMessage=()=>{
 //输入内容不为空：发送
  if(this.state.boolSend){
  this.setState({
    visible: false,
    data:this.state.data.map(item=>{
      if(item.id==this.state.id){
        item.leaveMessage=[this.suibianxie.current.value,...item.leaveMessage];
      }
      return item;
    })
  });
  //发送成功 
  console.log(this.state.data);
  message.success('回复成功', 2)
  console.log(this.state.id);
}
//输入内容为空:弹出警告框
else{
  notification.warn({
    message: '警告',
    description: '回复的内容不能为空',
    // onClick: () => {
    //   console.log('Notification Clicked!');
    // },
  });
}
}
handleArea=()=>{
  if(this.suibianxie.current.textLength>0){
    this.setState({
      boolSend:true,
    })
  }
}
  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 20) {
      message.warning('已经到底啦！');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.data );
      this.setState({
        data,
        loading: false,
      });
    });
  }
  //显示回复模态框
  showModal = (id) => {
    // console.log(this.suibianxie.current);
    // this.suibianxie.current=null;
    //回复的时候先将输入框的内容清空
    console.log(id);
    this.setState({
      visible: true,
      //每次显示模态框的时候，把boolsend修改成false
      boolSend:false,
      id,
    
    });
  }
    //隐藏回复模态框
    hideModal = (...arg) => {
      this.setState({
        visible: false,
      });
    }
    showModal1 = (...arg) => {
      this.setState({
        visible1: true,
      });
    }
    //隐藏新增模态框
    hideModal1 = (...arg) => {
      this.setState({
        visible1: false,
      });
    }
    handleEdit=(id)=>{
      //获取点击查看详情的留言参数
      const currentMessage=this.state.data.filter((item)=>item.id==id)
      this.props.history.push({
        pathname:`/admin/guestbook/edit/${id}`,
        state:{currentMessage}
      });
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          //判断输入的数据是否符合规范，符合规范就隐藏模态框，不符合规范就隐藏
          this.setState({
            visible1: false,
          });
           message.success('增添成功',3);
          //表单验证成功，之后就定义数据格式
        }
      });
    }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <Card
      title="评论区"
      extra={  <Button type="primary" onClick={this.showModal1}>
      <Icon type="plus" />新增留言

    </Button>}
      style={{ width: 1050 ,height:700}}
    >
         <Modal
          title="回复留言"
          visible={this.state.visible}
          onCancel={this.hideModal}
          cancelText="取消"
          width="600px"
          okText="发送"
          onOk={this.applyMessage}
        >
        <textarea style={{width:550}} cols='5' rows='10' placeholder="请输入回复内容" onChange={this.handleArea} ref={this.suibianxie} />
        </Modal>
        <Modal
          title="新增留言"
          visible={this.state.visible1}
          onCancel={this.hideModal1}
          cancelText="取消"
          width="600px"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            {/* <Form onSubmit={this.handleSubmit} className="login-form"> */}
            <Form.Item
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('Customer', {
                rules: [{ required: true,message: '请输入汉字姓名',pattern:/^([\u4e00-\u9fa5]){2,7}$/}],
                validateFirst:true,
              })(
                <Input placeholder="Username" />
              )}
            </Form.Item>
                <Form.Item
              {...formItemLayout}
              label="邮箱"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '请输入正确的邮箱',
                }, {
                  required: true, message: '请输入你的邮箱',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
               {...formItemLayout}
               label="留言">
                  {getFieldDecorator('message', {
        
              })(
        <textarea style={{width:370}} cols='10' rows='5' placeholder="留言内容" onChange={this.handleArea} ref={this.suibianxie} />
                
              )}
          
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                添加
          </Button>
            </Form.Item>
          </Form>
        </Modal>
         <div className="demo-infinite-container">
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={this.handleInfiniteOnLoad}
      hasMore={!this.state.loading && this.state.hasMore}
      useWindow={false}
    >
      <List
      style={{height:700}}
        dataSource={this.state.data}
        renderItem={item => (
          // <List.Item key={item.id}>
          //   <List.Item.Meta
          //     avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          //     title={<a href="https://ant.design">{item.name.last}</a>}
          //     description={item.email}
          //   />
          //   <div>查看详情</div>
          // </List.Item>
          
          <div>
            
          <Comment
          // actions={actions}
          author={<a>{item.email}</a>}
          avatar={(
            <Avatar
              src={item.img}
              alt={item.name}
              onClick={this.handleEdit.bind(this,item.id)}
            />
          )}
          content={item.content}
        //   datetime={(
        //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        //       <span>{moment().fromNow()}</span>
        //     </Tooltip>
        //   )
        // }
        datetime={ (
          <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().subtract(1, 'days').fromNow()}</span>
          </Tooltip>
        )
      }
        />
        <span>
        <Tooltip title="喜欢">
          <Icon
            type="like"
            theme={item.action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like.bind(this,item.id)}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {item.likes}
        </span>
      </span>
      <span>
        <Tooltip title="不喜欢">
          <Icon
            type="dislike"
            theme={item.action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike.bind(this,item.id)}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {item.dislikes}
        </span>
      </span>
      {/* <span
      onClick={this.apply.bind(this,item.id)}>回复</span> */}
       <Tooltip title="回复">
      <Icon type="message" onClick={this.showModal.bind(this,item.id)} />
      </Tooltip>
      </div>
      
        )}
        
      >
   
        {this.state.loading && this.state.hasMore && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
      </List>
    </InfiniteScroll>
  </div>
    </Card>
   
);
  }
}
