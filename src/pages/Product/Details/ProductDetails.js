import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon
} from 'antd'

export default class ProductDetails extends Component {
  render() {
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
        </Card>
    )
  }
}
