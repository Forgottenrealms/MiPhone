import React, { Component } from 'react'

import moment from 'moment'

import {
  Table,
  Icon,
  Button
} from 'antd'

import './UsersManagement.less';

import { getUsers } from "../../../requests"

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
      <Table 
      loading={this.state.isLoading}
      rowKey={record => record.id}
      rowSelection={rowSelection} 
      columns={this.columns} 
      dataSource={this.state.data}
      />
    );
  }
}
