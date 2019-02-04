import React, { Component } from "react";
import { Table, Button, Icon, Tag, Checkbox, Card, Select, Divider, Modal, Input, DatePicker, message, Form } from "antd";
import { getDataTables, getDataDetails } from "../../../requests";
import moment from "moment"
import "./OrderView.less"
import XLSX from "xlsx"

const Option = Select.Option;
const InputGroup = Input.Group;

@Form.create()
export default class DataTables extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
      totalCount: 0,
      pageSize: 8,
      currentpage: 1,
      selectedRowKeys: [],
      filteredInfo: null,
      sortedInfo: null,
      visible: false,
      dateValue: "2019-1-1"
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.state.dataSource);
        //判断输入的数据是否符合规范，符合规范就隐藏模态框，不符合规范就隐藏
        this.setState({
          visible: false,
        });
        //表单验证成功，之后就定义数据格式
         const {Customer,shipTo,Price,Status}=values;
         let price=Price+'￥',
             id=1000+this.state.totalCount,
             customer=Customer,
             createAT=moment(this.state.dateValue).format('x'),
             record=this.state.totalCount;
            //  console.log(this.state.totalCount);
             let rowValue={id,Status,customer,shipTo,price,amount:2,record,createAT,key:id};
             this.setState({
               dataSource:[...this.state.dataSource,rowValue],
               totalCount:++this.state.totalCount,
             })
            //  console.log(this.dataSource);
              //  this.fetchArticles()
               console.log(rowValue);
               console.log(this.state.totalCount);
               setTimeout(() => {
                 this.fetchArticles()
                 
               }, 2000)
      }
    });
  }

  // 点击查看跳转到数据详情页
  handleView = (id) => {
    console.log(id);
    this.props.history.push(`/admin/order/edit/${id}`);
  }
  // 导出Excel
  exportExcel = () => {
    const title = this.columns.map(item => item.title)
    title.pop()
    // console.log(title)
    const data = this.state.dataSource.reduce((result, item) => {
      const row = [item.record, item.createAT, item.customer, item.shipTo, item.price, item.amount, item.Status]
      result.push(row)
      return result
    }, [])
    data.shift(title)
    // console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  componentDidMount() {
    this.fetchArticles();
  }
  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    getDataTables(
      {
        offset: (this.state.currentpage - 1) * this.state.pageSize,
        limited: this.state.pageSize,
        totalCount:this.state.totalCount===0?48:this.state.totalCount
      }).then(res => {
        if (res.data.code === "200") {
          this.setState({
            dataSource: res.data.data,
            isLoading: false,
            totalCount: res.data.totalCount,
            currentpage: res.data.currentpage
          });
        }
      });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      currentpage: pagination.current,
      filteredInfo: filters,
      sortedInfo: sorter,
    }, () => {
      this.fetchArticles()
    })
    console.log(this.state.filteredInfo, this.state.sortedInfo);
  }
  //显示新增模态框
  showModal = (...arg) => {
    this.setState({
      visible: true,
    });
  }
  //隐藏新增模态框
  hideModal = (...arg) => {
    this.setState({
      visible: false,
    });
  }
  handeleDateChange = (moments, value) => {
    //判断选择的日期时间是否大于当前的时间
    let dateNow = Date.now(),
      dateValues = Date.parse(value)
    if (dateNow < dateValues) {

      message.error('日期选择错误,日期已经初始化,请重新选择')
    }
    else {
      let suibian = moment(value).format("YYYY-MM-DD");
      console.log(suibian);
      this.setState({
        dateValue: suibian
      })
    }
  }
  checkoutPrice=()=>{
    //当失去价格输入框的焦点时，验证
    console.log(this.props.form.getFiledError('Price'));
    
    // this.props.form.getFieldError('Price')
    // console.log()
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

    let { selectedRowKeys } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const { getFieldDecorator } = this.props.form;
    const columns = [

      {
        title: "Record #",
        dataIndex: "record",
        key: "record",
        render: (text, record) => {
          console.log(text);
          return text + (this.state.currentpage - 1) * this.state.pageSize;

        }
      },
      {
        title: "Date",
        dataIndex: "createAT",
        key: "createAT",
        sorter: (a, b) => a.createAT - b.createAT,
        render: (createAT) => {
          return moment(Number.parseInt(createAT, 10)).format('YYYY-MM-DD');
        },

      },
      {
        title: "Customer",
        key: "customer",
        dataIndex: "customer",
        sorter: (a, b) => a.customer.length - b.customer.length,
        // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order
      },
      {
        title: "Ship To",
        key: "shipTo",
        dataIndex: "shipTo"
      },
      {
        title: "Price",
        key: "price",
        dataIndex: "price",
        sorter: (a, b) => Number.parseInt(a.price.slice(0, a.price.length - 1)) - Number.parseInt(b.price.slice(0, b.price.length - 1)),
      },
      {
        title: "Amount",
        key: "amount",
        dataIndex: "amount",
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "Status",
        filters: [
          { text: 'Pending', value: 'Pending' },
          { text: 'On Hold', value: 'On Hold' },
          { text: 'Closed', value: 'Closed' },
          { text: 'Fraud', value: 'Fraud' },
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.Status.includes(value),
        render: (status) => {
          switch (status) {
            case "Pending": return (<Tag color="#87d068">{status}</Tag>);
            case "On Hold": return (<Tag color="#f50">{status}</Tag>);
            case "Closed": return (<Tag color="#2db7f5">{status}</Tag>);
            case "Fraud": return (<Tag color="#108ee9">{status}</Tag>);
            default: return;
          }
        }
      },
      {
        title: "Actions",
        key: "action",
        render: (record) => {
          return (
            <Button size="small"
              loading={this.state.isLoading}
              onClick={this.handleView.bind(this, record.id)}
            >
             <Icon type="edit" />
              编辑
            </Button>
          );
        }
      }
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: '选中奇数行',
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
          text: '选择偶数行',
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
    // console.log(this.props.form);
    return (
      <div>
        {/* TODO:标题左边图标 */}
        <Modal
          title="新增订单"
          visible={this.state.visible}
          onCancel={this.hideModal}
          cancelText="取消"
          width="600px"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            {/* <Form onSubmit={this.handleSubmit} className="login-form"> */}
            <Form.Item
              {...formItemLayout}
              label="日期"
            >

              <DatePicker style={{ width: '70%' }} onChange={this.handeleDateChange} showToday={true} allowClear={false} value={moment(this.state.dateValue, 'YYYY-MM-DD')} />

            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="购买人姓名"
            >
              {getFieldDecorator('Customer', {
                rules: [{ required: true,message: '请输入汉字姓名',pattern:/^([\u4e00-\u9fa5]){2,7}$/}],
                validateFirst:true,
              })(
                <Input placeholder="Customer" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="收货人姓名"
            >
              {getFieldDecorator('shipTo', {
                rules: [{ required: true, message: '请输入汉字姓名',pattern:/^([\u4e00-\u9fa5]){2,7}$/ }],
                validateFirst:true,

              })(

                <Input placeholder="shipTo" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="商品价格"
            >
              {getFieldDecorator('Price', {
                rules: [{ required: true, message: '这是一个数字',pattern:/^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i}],
                validateFirst:false,

              })(
                <Input placeholder="Price"/>
              )
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('Status', {
                rules: [{ required: true, message: '状态' }],
                validateFirst:true,

              })(
                <Select span={24}>
                <Option value="pedding">pedding</Option>
                <Option value="On Hold">On Hold</Option>
                <Option value="Closed">Closed</Option>
                <Option value="Fraud">Fraud</Option>
              </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存
          </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Card
          headStyle={{ color: '#7c6bc0', fontSize: '24px', fontWeight: 'bold' }}
          tabList
          title="订单列表"
          extra={
            <div>
              <Button type="primary" onClick={this.showModal}>
                <Icon type="plus" />新增订单

              </Button>
              <Select
                type="green"
                defaultValue="Tools"
                style={{ marginLeft: "8px", minWidth: "120px", backgroundColor: "@success-color" }}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
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
              <span style={{ fontSize: '18px', color: '#7986cb' }}>一共找到{this.state.totalCount}条记录</span>
            </div>
          }
        >
          <Table
            className="data-tables"
            rowSelection={rowSelection}
            loading={this.state.isLoading}
            // rowkey={record => record.id}
            columns={columns}
            rowClassName={(record, index) => index % 2 !== 0 ? 'changeColor' : ""}
            dataSource={this.state.dataSource}
            bordered
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: true,
              position: "both",
              pageSize: this.state.pageSize,
              total: this.state.totalCount,
              current: this.state.currentpage
            }}
            onChange={this.handleChange}
            size="middle"

          />
        </Card>
      </div>
    );
  }
}

