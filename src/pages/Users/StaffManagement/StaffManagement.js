import React, { Component } from 'react'

import './StaffManagement.less'

import { getStaffs, deleteStaffById } from "../../../requests"
import moment from 'moment'

import XLSX from 'xlsx'

import {
  Table,
  Switch,
  Modal,
  message,
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
        title: '员工编号', width: 100, dataIndex: 'id', key: 'id', fixed: 'left',
      },
      {
        title: '员工姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
      },
      {
        title: '联系电话', width: 115, dataIndex: 'telephone', key: 'telephone', fixed: 'left',
      },
      {
        title: '入职日期', 
        width: 110, 
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
        fixed: 'left',
        render:(authority) => {
          return(
            <div>
              <Switch size="small" checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} checked= {authority} />
            </div>
          )
        }
      },
      {
        title:'一周考勤',
        children: [
          {
            title: '星期一', dataIndex: 'Mon', key: 'Mon', width: 100,
            render:(Mon) => {
              return (
                Mon
              )
            }
          },
          {
            title: '星期二', dataIndex: 'Tues', key: 'Tues', width: 100,
            render:(Tues) => {
              return (
                Tues
              )
            }
          },
          {
            title: '星期三', dataIndex: 'Wed', key: 'Wed', width: 100,
            render:(Wed) => {
              return (
                Wed
              )
            }
          },
          {
            title: '星期四', dataIndex: 'Thur', key: 'Thur', width: 100,
            render:(Thur) => {
              return (
                Thur
              )
            }
          },
          {
            title: '星期五', dataIndex: 'Fri', key: 'Fri', width: 100,
            render:(Fri) => {
              return (
                Fri
              )
            }
          },
          {
            title: '星期六', dataIndex: 'Sat', key: 'Sat', width: 100,
            render:(Sat) => {
              return (
                Sat
              )
            }
          },
        ]
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 160,
        render: (record) => {
          return(
            <div>
            <Button.Group size="small">
              <Button  type="primary" onClick={this.handleEdit.bind(this,record.id)}><Icon type="edit" />修改 </Button>
              <Button type="danger" onClick={this.handleDelete.bind(this, record.id)}>删除<Icon type="delete" /></Button>
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

  // 获取列表
  getStaffsList = () => {
    this.setState({
      isLoading: true
    })
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
  // 删除操作
  handleDelete = (id) => {
    Modal.confirm({
      centered: true,
      maskClosable: true,
      okText: "确定",
      cancelText: "取消",
      content: <span>确认要删除吗？</span>,
      onOk: () => {
        this.setState({
          isLoading: true,
        })
        deleteStaffById(id)
        .then(resp => {
          if (resp.data.code === 200) {
            this.getStaffsList()
            message.success(resp.data.msg)
          }
        })
      }
    })
  }

  // 编辑操作
  handleEdit = (id) => {
    // console.log("编辑操作")
    this.props.history.push(`/admin/staff/edit/${id}`,{
      x:1
    })
  }

  componentDidMount () {
    this.getStaffsList()
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
            size='small'
            rowKey={record => record.id}
            columns={this.columns} 
            dataSource={this.state.data}
            scroll={{ x:  '130%'}}
            align="center"
          />
        </Card>
      </div>
    )
  }
}
