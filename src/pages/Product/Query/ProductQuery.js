import React, { Component } from "react"
import { 
    Card,
    List,
    Row,
    Col,
    Tag,
    Tooltip,
    Icon,
    Avatar,
    Meta
} from "antd"

import { getProductTables } from "../../../requests"
import "./ProductQuery.less"

import moment from 'moment'
import Item from "antd/lib/list/Item";

export default class ProductQuery extends Component {
    constructor() {
        super()
        this.state = {
            listData: [],
            isLoading: true
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
    
    componentDidMount() {
        this.fetchProductData()
    }
  render() {
    console.log(this.state.listData)
    return (
        <div>
            <Card
                title="已上架手机"
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
                                        // onClick={this.handleQueryDetail.bind(this, item.id)}
                                        >
                                        <Card
                                            className="product-card"
                                            cover={
                                                <div className="product-type">
                                                    <h1>{item.type}</h1>
                                                    <Tag>{item.status}</Tag>
                                                </div>
                                            }
                                            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
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
            >
                <Row gutter={16}>
                    {
                        this.state.listData.map(item => {
                            if(item.shelf === "下架") {
                                return (
                                    <Col className="gutter-row" span={6}>
                                        <Card
                                            className="product-card"
                                            cover={
                                                <div className="product-type">
                                                    <h1>{item.type}</h1>
                                                    <Tag>{item.status}</Tag>
                                                </div>
                                            }
                                            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
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
