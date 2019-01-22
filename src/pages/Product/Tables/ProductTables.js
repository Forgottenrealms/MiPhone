import React, { Component } from 'react'

import { Table, Button, Icon, Tag, Card, Select, Divider } from "antd"
import { getProductTables } from "@/requests"
import moment from "moment"
import XLSX from "xlsx"
import "./ProductTables.less"

const Option = Select.Option;

export default class ProductTables extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true
    };
  }
  columns = [
    {
      title: "型号",
      key: "type",
      dataIndex: "type"
    },
    {
      title: "售价",
      key: "price",
      dataIndex: "price"
    },
    {
      title: "库存",
      key: "amount",
      dataIndex: "amount"
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        switch(status) {
            case "即将售罄": return (<Tag color="#87d068">{status}</Tag>);
            case "热销": return (<Tag color="#f50">{status}</Tag>);
            case "在售": return (<Tag color="#2db7f5">{status}</Tag>);
            case "降价": return (<Tag color="#108ee9">{status}</Tag>);
            default: return;
        }
      }
    },
    {
      title: "上次更新",
      key: "updateTime",
      dataIndex: "updateTime",
      render: (updateTime) => {
        // console.log(updateTime)
        return moment(Number.parseInt(updateTime, 10)).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: "操作",
      key: "action",
      render: (record) => {
        return (
          <Button size="small" 
            loading={this.state.isLoading} 
            onClick={this.handleView.bind(this, record.id)}
            >
            <Icon type="search" />
            查看详情
          </Button>
        );
      }
    }
  ];
  // 点击查看跳转到数据详情页
  handleView = (id) => {
    this.props.history.push(`/admin/product/details/${id}`)
  }
  // 导出Excel
  exportExcel = () => {
    const title = this.columns.map(item => item.title)
    title.pop()
    console.log(title)
    const data = this.state.dataSource.reduce((result, item) => {
        const row = [item.type, item.price, item.amount, item.status, item.updateTime]
        result.push(row)
        return result
    }, [])
    data.unshift(title)
    console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
  // 设置类名
  setClassName = (record, index) => {
    console.log(index)
    return (index % 2 === 0 ? "even-tr" : "")
  }
  componentDidMount() {
    getProductTables().then(res => {
      if (res.data.code === "200") {
        this.setState({
          dataSource: res.data.data,
          isLoading: false
        });
      }
    });
  }
  render() {
    return (
      <div>
        {/* TODO:标题左边图标 */}
        <Card
            title="商品列表"
            extra={
                <div>
                    <Button type="primary">
                        <Icon type="plus" />新增
                    </Button>
                    <Select 
                        type="green"
                        defaultValue="导出"
                        style={{ marginLeft: "8px", minWidth: "120px", backgroundColor: "@success-color"}}
                        dropdownRender={menu => (
                            <div>
                                {menu}
                                <Divider style={{ margin: '4px 0'}} />
                                <div style={{ padding: '8px', cursor: 'pointer' }}>
                                <Icon type="plus" /> Print Invoices
                                </div>
                            </div>
                        )}
                    >
                        <Option value="excel" onClick={this.exportExcel}>Export to Excel</Option>
                        <Option value="csv">Export to CSV</Option>
                        <Option value="xml">Export to XML</Option>
                    </Select>
                </div>
            }
        > 
        <Table
            loading={this.state.isLoading}
            columns={this.columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={{
              pageSize: 20
            }}
            size="small"
            // rowClassName={this.setClassName}
        />
        </Card>
      </div>
    )
  }
}
