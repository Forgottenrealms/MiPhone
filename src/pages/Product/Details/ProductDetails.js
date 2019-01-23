import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Row,
  Col
} from 'antd'
import { getProductDetails } from '@/requests'

export default class ProductDetails extends Component {
  constructor() {
    super()
    this.state = {
      productDetails: {}
    }
  }
  componentDidMount() {
    // 获取要查询的商品id
    const _id = this.props.match.params.id
    console.log(_id)
    this.fetchProductDetails(_id)
  }
  fetchProductDetails = (id) => {
    getProductDetails(id)
      .then(res => {
        if (res.data.code === "200") {
          res.data.data.map(item => {
            if (item.id == id) {
              this.setState({
                productDetails: item
              })
            }
          })
        }
      })
  }
  render() {
    console.log(this.state.productDetails)
    return (
      <Card
          title="商品详情 >"
          extra={
              <div>
                  <Button type="primary">
                      <Icon type="edit" />编辑
                  </Button>
              </div>
          }
      > 
        <Row
          type="flex" 
          justify="space-between"
        >
          <Col 
            span={7}
            style={{
              padding: '20px',
              backgroundColor: '#dedede'
            }}
          >
            <Card title="型号" bordered={false} style={{ width: 300 }}>
              <p>{this.state.productDetails.type}</p>
            </Card>
          </Col>
          <Col 
            span={7}
            style={{
              padding: '20px',
              backgroundColor: '#dedede'
            }}
          >
            <Card title="售价" bordered={false} style={{ width: 300 }}>
              <p>{this.state.productDetails.price}</p>
            </Card>
          </Col>
          <Col 
            span={7}
            style={{
              padding: '20px',
              backgroundColor: '#dedede'
            }}
          >
            <Card title="销量" bordered={false} style={{ width: 300 }}>
              <p>{this.state.productDetails.sales}</p>
            </Card>
          </Col>
        </Row>
        <Row
          type="flex" 
          justify="space-between"
          style={{
            marginTop: '50px'
          }}
        >
          <Col 
            span={7}
            style={{
              padding: '20px',
              backgroundColor: '#dedede'
            }}
          >
            <Card title="简介" bordered={false} style={{ width: 300 }}>
              <p>{this.state.productDetails.desc}</p>
            </Card>
          </Col>
          <Col 
            span={7}
            style={{
              padding: '20px',
              backgroundColor: '#dedede'
            }}
          >
            <Card title="库存" bordered={false} style={{ width: 300 }}>
              <p>{this.state.productDetails.amount}</p>
            </Card>
          </Col>
          <Col 
            span={7}
            style={{
              padding: '20px',
              backgroundColor: '#dedede'
            }}
          >
            <Card title="上次更新" bordered={false} style={{ width: 300 }}>
              <p>{this.state.productDetails.updateTime}</p>
            </Card>
          </Col>
        </Row>
      </Card>
    )
  }
}
