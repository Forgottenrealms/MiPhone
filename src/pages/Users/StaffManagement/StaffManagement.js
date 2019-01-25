import React, { Component } from 'react'

import './StaffManagement.less'

import { getStaffs } from "../../../requests"
import moment from 'moment'

import XLSX from 'xlsx'

import {
  Table,
  Switch,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Icon,
  Button,
  Card,
  Select,
  Divider
} from 'antd'

const Option = Select.Option;

export default class UsersProfile extends Component {
  constructor() {
    super()
    this.state = {
      data : [],
      isLoading:true
    }
    this.columns = [
      {
        title: '员工编号', width: 100, align: 'center', dataIndex: 'id', key: 'id', fixed: 'left',
      },
      {
        title: '员工姓名', width: 100, align: 'center', dataIndex: 'name', key: 'name', fixed: 'left',
      },
      {
        title: '联系电话', width: 115, align: 'center', dataIndex: 'telephone', key: 'telephone', fixed: 'left',
      },
      {
        title: '入职日期', 
        width: 110, 
        align: 'center', 
        dataIndex: 'entrydate', 
        key: 'entrydate', 
        fixed: 'left',
        render:(entrydate) => {
          return moment(Number.parseInt(entrydate)).format('YYYY-MM-DD');
        }
      },
      {
        title: '管理权限',
        width: 100, 
        dataIndex: 'authority', 
        key: 'authority', 
        align: 'center',
        fixed: 'left',
        render:() => {
          return(
            <div>
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
            </div>
          )
        }
      },
      {
        title: '星期一', dataIndex: 'Mon', key: 'Mon', width: 100,align: 'center',
      },
      {
        title: '星期二', dataIndex: 'Tues', key: 'Tues', width: 100,align: 'center',
      },
      {
        title: '星期三', dataIndex: 'Wed', key: 'Wed', width: 100,align: 'center',
      },
      {
        title: '星期四', dataIndex: 'Thur', key: 'Thur', width: 100,align: 'center',
      },
      {
        title: '星期五', dataIndex: 'Fri', key: 'Fri', width: 100,align: 'center',
      },
      {
        title: '星期六', dataIndex: 'Sat', key: 'Sat', width: 100,align: 'center',
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: 160,
        render: (record) => {
          return(
            <div>
            <Button.Group size="small">
              <Button  type="primary" onClick={() => this.edit(record.key)}><Icon type="edit" />修改 </Button>
              <Button type="danger">删除<Icon type="delete" /></Button>
            </Button.Group>
          </div>
          )
        }
      },
    ];
  }

  // 导出Excel 
  exportExcel = () => {
    const title = this.columns.map(item => item.title)
    title.pop()
    // console.log(title)
    const data = this.state.data.reduce((result, item) => {
        const row = [
          item.id, 
          item.name, 
          item.telephone, 
          item.entrydate, 
          item.authority, 
          item.Mon,
          item.Tues, 
          item.Wed,
          item.Thur, 
          item.Fri, 
          item.Sat, 
          ]
        result.push(row)
        return result
    }, [])
    data.unshift(title)
    // console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  componentDidMount () {
    getStaffs()
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

    return (
        <div>
          <Card
            title="员工列表"
            extra={
                <div>
                    <Button type="primary">
                        <Icon type="plus" />新增
                    </Button>
                    <Select 
                        type="primary" 
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
            bordered
            loading={this.state.isLoading}
            size={'small'}
            // align={'right'}
            rowKey={record => record.id}
            // rowSelection={rowSelection} 
            columns={this.columns} 
            dataSource={this.state.data}
            // rowClassName="editable-row"
            scroll={{ x: 1270}}
            size="small"
          />
        </Card>
      </div>
    )
  }
}
