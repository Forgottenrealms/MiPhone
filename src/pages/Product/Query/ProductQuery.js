import React, { Component } from "react"
import { 
    Card,
    Row,
    Col,
    Tag,
    Icon,
    Menu,
    Dropdown,
    Button,
    message
} from "antd"

import { getProductTables, updateShelf } from "../../../requests"
import "./ProductQuery.less"

import moment from 'moment'

export default class ProductQuery extends Component {
    constructor() {
        super()
        this.state = {
            listData: [],
            isLoading: true,
            shelf: ""
        }
    }
    // 获取商品数据
    fetchProductData = () => {
        getProductTables()
            .then(res => {
                if(res.data.code === '200') {
                    this.setState({
                        listData: res.data.data,
                        isLoading: false
                    })
                }
            })
    }
    // 鼠标滑入滑出事件
    handleMouseEnter = (e) => {
        e.currentTarget.className = "pulse animated ant-col-6 gutter-row"
    }
    handleMouseLeave = (e) => {
        e.currentTarget.className = "ant-col-6 gutter-row"
    }
    // 处理点击某项商品跳转到查询详情页
    handleQueryDetail = (id) => {
        this.props.history.push(`/admin/product/details/${id}`)
    }
    // 处理商品上架下架
    handleProductShelf = () => {
        updateShelf()
            .then(res => {
                if(res.data.code === '200') {
                    this.setState({
                        shelf: res.data.data.msg
                    })
                }
                message.info(this.state.shelf)
            })
    }
    
    componentDidMount() {
        this.fetchProductData()
    }
  render() {
    console.log(this.state.listData)
    const menu1 = (
        <Menu>
          <Menu.Item key="1" onClick={this.handleQueryDetail.bind(this, 1001)}>查看详情</Menu.Item>
          <Menu.Item key="2" onClick={this.handleProductShelf}>下架</Menu.Item>
        </Menu>
      );
    const menu2 = (
        <Menu>
          <Menu.Item key="1" onClick={this.handleQueryDetail.bind(this, 1001)}>查看详情</Menu.Item>
          <Menu.Item key="2" onClick={this.handleProductShelf.bind(this, "上架")}>上架</Menu.Item>
        </Menu>
      );
    return (
        <div>
            <Card
                title="已上架手机"
                className="product-query-card"
            >
                <Row gutter={16}>
                    {
                        this.state.listData.map(item => {
                            if(item.shelf === "上架") {
                                return (
                                    <Col 
                                        className="gutter-row" 
                                        span={6}
                                        onMouseEnter={this.handleMouseEnter}
                                        onMouseLeave={this.handleMouseLeave}
                                        >
                                        <Card
                                            className="product-card"
                                            cover={
                                                <div className="product-type">
                                                    <h1>{item.type}</h1>
                                                    <Tag>{item.status}</Tag>
                                                </div>
                                            }
                                            actions={[
                                            <Dropdown overlay={menu1} placement="bottomRight">
                                                <Button>
                                                <Icon type="setting" />
                                                </Button>
                                            </Dropdown>, 
                                            <Icon type="edit" />, 
                                            <Icon type="ellipsis" />]}
                                        >
                                            <div className="product-price">
                                                <span>售价</span>
                                                <h1>{item.price}</h1>
                                            </div>
                                            <div className="product-desc">
                                                <h3>简介</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                            <div className="product-updatetime">
                                                <h3>上架时间</h3>
                                                <p>{moment(Number.parseInt(item.updateTime, 10)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                            </div>
                                        </Card> 
                                    </Col>
                                )
                            }
                            
                        })
                    }
                </Row>
            </Card>
            <Card
                title="已下架手机"
                className="product-query-card"
            >
                <Row gutter={16}>
                    {
                        this.state.listData.map(item => {
                            if(item.shelf === "下架") {
                                return (
                                    <Col 
                                        className="gutter-row" 
                                        span={6}
                                        onMouseEnter={this.handleMouseEnter}
                                        onMouseLeave={this.handleMouseLeave}
                                    >
                                        <Card
                                            className="product-card"
                                            cover={
                                                <div className="product-type">
                                                    <h1>{item.type}</h1>
                                                    <Tag>{item.status}</Tag>
                                                </div>
                                            }
                                            actions={[
                                                <Dropdown overlay={menu2} placement="bottomRight">
                                                    <Button>
                                                    <Icon type="setting" />
                                                    </Button>
                                                </Dropdown>, 
                                                <Icon type="edit" />, 
                                                <Icon type="ellipsis" />]}
                                        >
                                            <div className="product-price">
                                                <span>售价</span>
                                                <h1>{item.price}</h1>
                                            </div>
                                            <div className="product-desc">
                                                <h3>简介</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                            <div className="product-updatetime">
                                                <h3>下架时间</h3>
                                                <p>{moment(Number.parseInt(item.updateTime, 10)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                            </div>
                                        </Card> 
                                    </Col>
                                )
                            }
                            
                        })
                    }
                </Row>
            </Card>
        </div>
    )
  }
}
