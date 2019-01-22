import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import moment from 'moment'

import {
  Table,
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

import './UsersManagement.less';

import { getUsers } from "../../../requests"

import XLSX from 'xlsx'

const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default class UsersManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
    data : [],
    selectedRowKeys: [],
    editingKey: '',
    isLoading:true
    };
    this.columns = [{
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    }, {
      title: '联系电话',
      dataIndex: 'telephone',
      key: 'telephone',
      editable: true,
    },{
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    }, {
      title: '积分',
      dataIndex: 'integral',
      key: 'integral',
      editable: true,
    }, {
      title: '注册时间',
      dataIndex: 'createAt',
      key: 'createAt',
      editable: true,
      render: (createAt) => {
        // console.log(createAt)
        return moment(Number.parseInt(createAt)).format('YYYY-MM-DD hh:mm:ss');
      }
    }, {
      title: '操作',
      key: 'actions',
      render: (text, record, index) => {
        const editable = this.isEditing(record);
        return (
          <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record.key)}
                          style={{ marginRight: 8 }}
                        >
                          保存
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="确定取消吗?"
                      onConfirm={() => this.cancel(record.key)}
                    >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <Button.Group size="small">
                    <Button  type="primary" onClick={() => this.edit(record.key)}><Icon type="edit" />修改 </Button>
                    <Button type="danger">删除<Icon type="delete" /></Button>
                  </Button.Group>
                )}
              </div>
        )
      }
    }];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
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

  // getInput = () => {
  //   if (this.props.inputType === 'number') {
  //     return <InputNumber />;
  //   }
  //   return <Input />;
  // };
  
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
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    const { selectedRowKeys } = this.state;
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
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
      components={components}
      bordered
      loading={this.state.isLoading}
      rowKey={record => record.id}
      rowSelection={rowSelection} 
      columns={this.columns} 
      dataSource={this.state.data}
      rowClassName="editable-row"
      />
      
      </Card>
      </div>
    )
  }
}

// ReactDOM.render(<UsersManagement />, mountNode);