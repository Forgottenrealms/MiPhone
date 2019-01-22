import React, { Component } from 'react'

import moment from 'moment'

import {
  Table,
  Icon,
  Button,
  Card,
  Select,
  Tag,
  Divider
} from 'antd'

import './UsersManagement.less';

import { getUsers } from "../../../requests"

import XLSX from 'xlsx'

const Option = Select.Option;

export default class UsersManagement extends Component {
  columns = [{
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '联系电话',
    dataIndex: 'telephone',
    key: 'telephone',
  },{
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '积分',
    dataIndex: 'integral',
    key: 'integral',
  }, {
    title: '注册时间',
    dataIndex: 'createAt',
    key: 'createAt',
    render: (createAt) => {
      // console.log(createAt)
      return moment(Number.parseInt(createAt)).format('YYYY-MM-DD hh:mm:ss');
    }
  }, {
    title: '操作',
    key: 'actions',
    render: (text, record, index) => {
      return (
        <Button.Group size="small" onClick={this.handleEdit}>
          <Button type="primary">
            <Icon type="edit" />修改
          </Button>
          <Button type="danger">
            删除<Icon type="delete" />
          </Button>
        </Button.Group>
      )
    }
  }];

  constructor () {
    super()
    this.state = {
    data : [],
    selectedRowKeys: [],
    isLoading:true
    }
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  // 导出Excel
  exportExcel = () => {
    const title = this.columns.map(item => item.title)
    title.pop()
    console.log(title)
    console.log(this.state.data)
    const ex_data = this.state.data.reduce((result, item) => {
        const row = [item.name, item.telephone, item.address, item.integral, item.createAt]
        result.push(row)
        return result
    }, [])
    ex_data.unshift(title)
    console.log(ex_data)
    const ws = XLSX.utils.aoa_to_sheet(ex_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
  
  componentDidMount () {
    getUsers()
      .then(resp => {
        console.log(resp)
        if (resp.data.code == 200) {
          this.setState({
            data: resp.data.data,
            isLoading: false
          })
        }
      })
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd', 
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          }); 
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <div>
        <Card
            title="用户列表"
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
      rowKey={record => record.id}
      rowSelection={rowSelection} 
      columns={this.columns} 
      dataSource={this.state.data}
      />
      
      </Card>
      </div>
    )
  }
}
