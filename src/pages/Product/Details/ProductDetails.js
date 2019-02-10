import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Icon,
  Row,
  Col,
  Switch
} from 'antd'
import { getProductDetails, getProductWeekSales, getProductMonthSales } from '@/requests'

import moment from 'moment'

const echarts = require('echarts')


export default class ProductDetails extends Component {
  constructor() {
    super()
    this.salesEcharts = createRef()
    this.monthSalesEcharts = createRef()
    this.state = {
      productDetails: {}
    }
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
  // 初始化销售走势图echarts实例
  initSalesEcharts = () => {
    // 基于准备好的dom，初始化echarts实例
    const salesChart = echarts.init(this.salesEcharts.current);
    getProductWeekSales()
      .then(res => {
        if (res.data.code === "200") {
          // console.log(res.data.data)
          // 绘制图表
          salesChart.setOption({
            title: {
                text: res.data.title
            },
            tooltip: {},
            xAxis: {
                data: res.data.data.map(item => item.week)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                color: "#1890ff",
                data: res.data.data.map(item => item.sales)
            }]
          });
        }
      })
    // 基于准备好的dom，初始化echarts实例
    const monthSalesChart = echarts.init(this.monthSalesEcharts.current);
    getProductMonthSales()
      .then(res => {
        if (res.data.code === "200") {
          // console.log(res.data.data)
          // 绘制图表
          monthSalesChart.setOption({
            title: {
                text: res.data.title
            },
            tooltip: {},
            xAxis: {
                data: res.data.data.map(item => item.month)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                color: "#1890ff",
                data: res.data.data.map(item => item.sales)
            }]
          });
        }
      })
  }
  // 点击编辑跳转商品编辑页
  handleProductEdit = (id) => {
    this.props.history.push(`/admin/product/edit/${id}`)
  }
  // 商品上架下架开关
  onShipTo = (checked) => {
    console.log(`switch to ${checked}`);
  }

  componentDidMount() {
    // 获取要查询的商品id
    const _id = this.props.match.params.id
    // console.log(_id)
    this.fetchProductDetails(_id)
    this.initSalesEcharts()
  }
  render() {
    // console.log(this.state.productDetails)
    return (
      <Card
        style={{backgroundColor: "#f0f2f5"}}
        title={"商品详情 > " + this.state.productDetails.type}
        headStyle={{
          fontSize: "24px"
        }}
        extra={
            <div>
                <Button type="primary" onClick={this.handleProductEdit.bind(this, 1001)}>
                    <Icon type="edit" />修改商品参数
                </Button>
            </div>
        }
      > 
        <Row
          gutter={16}
        >
          <Col
            span={6}
          >
            <Card title="型号" bordered={false} style={{ width: 240 }}>
              <h2>{this.state.productDetails.type}</h2>
            </Card>
          </Col>
          <Col
            span={6}
          >
            <Card title="在售价" bordered={false} style={{ width: 240 }}>
              <h2>{this.state.productDetails.price}</h2>
            </Card>
          </Col>
          <Col
            span={6}
          >
            <Card title="本周销量" bordered={false} style={{ width: 240 }}>
              <h2>{this.state.productDetails.sales}</h2>
            </Card>
          </Col>
          <Col
            span={6}
          >
            <Card title="商品简介" bordered={false} style={{ width: 240 }}>
              <h2>{this.state.productDetails.desc}</h2>
            </Card>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{marginBottom: "24px"}}
        >
          <Col
            span={6}
          >
            <Card title="库存" bordered={false} style={{ width: 240 }}>
              <h2>{this.state.productDetails.amount}</h2>
            </Card>
          </Col>
          <Col
            span={6}
          >
            <Card title="上架时间" bordered={false} style={{ width: 240 }}>
              <h2>{moment(Number.parseInt(this.state.productDetails.updateTime, 10)).format("HH:mm:ss DD/MM/YY")}</h2>
            </Card>
          </Col>
          {/* <Col
            span={6}
          >
            <Card title="上架" bordered={false} style={{ width: 240 }}>
              <Switch defaultChecked onChange={this.onShipTo} />
            </Card>
          </Col> */}
        </Row>
        <Card
          title="销量"
          headStyle={{
            fontSize: "24px"
          }}
        > 
          <Row
            type="flex"
            justify="space-around"
          >
            <Col>
              <div style={{height: "400px",width: "400px"}} ref={this.salesEcharts}></div>
            </Col>
            <Col>
              <div style={{height: "400px",width: "400px"}} ref={this.monthSalesEcharts}></div>
            </Col>
          </Row>
        </Card>
      </Card>
    )
  }
}
