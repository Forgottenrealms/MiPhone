import React, { Component } from "react"
import { 
    Card,
    List
} from "antd"

import { getProductTables } from "../../../requests"
import "./ProductQuery.less"

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
        e.currentTarget.className = "pulse animated ant-list-item"
    }
    handleMouseLeave = (e) => {
        e.currentTarget.className = "ant-list-item"
    }

    componentDidMount() {
        this.fetchProductData()
    }
    // 处理点击某项商品跳转到查询详情页
    handleQueryDetail = (id) => {
        this.props.history.push(`/admin/product/details/${id}`)
    }
  render() {
    console.log(this.state.listData)
    return (
      <Card
        title="商品查询"
      >
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
            // bordered={true}
            loading={this.state.isLoading}
            dataSource={this.state.listData}
            renderItem={item => (
                <List.Item
                    key={item.type}
                    style={{marginBottom: "24px", cursor: "pointer"}}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    extra={<img alt={item.type} src={item.imgs} />}
                    onClick={this.handleQueryDetail.bind(this, item.id)}
                >
                    <List.Item.Meta
                        title={item.type}
                        description={item.desc}
                    />
                    {/* TODO: 商品查询页内容显示 */}
                    {item.desc}
                </List.Item>
            )}
        />
      </Card>
    )
  }
}
