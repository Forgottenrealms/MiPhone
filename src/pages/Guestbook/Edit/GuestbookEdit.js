import React, { Component } from 'react'
import { Card, Col, Row,Collapse,List, Avatar} from 'antd';
import './GuestbookEdit.less'
const Panel = Collapse.Panel;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default class GuestbookEdit extends Component {
  constructor() {
    super()
    this.state = {
        Data: [],
        isLoading: true
    }
}
// componentDidMount() {
//   this.setState({
//     Data:this.props.location.state.currentMessage[0],
//   })
//   console.log(this.state.Data);
// }
  render() {
    const item=this.props.location.state.currentMessage[0]
    // console.log(this.props.location.state.currentMessage[0]);
    console.log(item);
    return (
      <div>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户名" bordered={false}>{item.name}</Card>
        </Col>
        <Col span={8}>
          <Card title="邮箱" bordered={false}>{item.email}</Card>
        </Col>
        <Col span={8}>
          <Card title="详情内容" bordered={false}>{item.content}</Card>
        </Col>
      </Row>
    </div>
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Collapse>
    <Panel header="留言回复" key="1">
    <List
    itemLayout="horizontal"
    dataSource={item.leaveMessage}
    renderItem={item1 => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          description={item1}
        />
      </List.Item>
    )}
  />
    </Panel>
  </Collapse>
    </div>
    </div>
    )
  }
}
