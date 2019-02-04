import React, { Component,createRef } from 'react'
import {
  List, message, Avatar, Spin, Comment, Icon, Tooltip, Card,Modal,notification
} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import './GuestbookView.less'
import InfiniteScroll from 'react-infinite-scroller';
// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const fakeDataUrl = 'http://localhost:8000/api/data/getComment';
export default class GuestbookView extends Component {
  constructor(){
    super(),
    this.suibianxie=createRef()
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      visible:false,
      boolSend:false
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
            item.likes=1;
            item.dislikes=0;
            item.action='liked';
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
          item.likes=0;
          item.dislikes=1;
          item.action='disliked';
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
  }); 
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
      message.warning('Infinite List loaded all');
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
  showModal = (...arg) => {
    this.setState({
      visible: true,
      //每次显示模态框的时候，把boolsend修改成false
      boolSend:false
    
    });
  }
    //隐藏回复模态框
    hideModal = (...arg) => {
      this.setState({
        visible: false,
      });
    }
  render() {
    return(
      <Card
      title="评论区"
      extra={<a href="#"></a>}
      style={{ width: 1400 ,height:700}}
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
            />
          )}
          content={item.content}
          datetime={(
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
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
