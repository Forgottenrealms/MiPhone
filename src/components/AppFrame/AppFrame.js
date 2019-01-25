import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Row, Col, Dropdown, Avatar, Badge } from "antd";

import routes from "../../routes";
import "./AppFrame.less";

const SubMenu = Menu.SubMenu;
const { Header, Content, Sider } = Layout;

class AppFrame extends Component {
  // 菜单缩起展开
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  // 菜单点击
  handleMenuClick = ({ key }) => {
      const {
        history,
        match
      } = this.props
    history.push(`${match.path}${key}`)
  }

  render() {
    const {
      pathname
    } = this.props.location;
    console.log(pathname)
    const defaultSelectedKeys = (pathname.split("/").slice(2).join("/") === "") ? "dashboard" : pathname.split("/").slice(2).join("/");
    // console.log(this.props.children);
    // 获取isMenu === true的路由
    const menus = routes.filter(item => item.isMenu === true);
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">个人主页</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">通知中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">退出登录</Menu.Item>
      </Menu>
    );
    
    const subMenus = routes.filter(item => item.isSubMenu === true);
    return (
      <Layout>
        <Header className="header">
          <Row>
            <Col span={18}> 
            <div className="logo">小米手机后台管理系统</div>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <Dropdown overlay={menu} trigger={['click']}>
                <Badge dot>
                  <span style={{color: '#fff', verticalAlign: '-2px', paddingRight: '8px'}}>欢迎您！{this.props.displayUsername}</span>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Badge>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider 
            width={200} 
            style={{ background: "#fff" }}
            trigger={null}
            // mode="inline"
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[`/${defaultSelectedKeys}`]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              onClick={this.handleMenuClick}
            >
              <SubMenu key="sub1" title={<span><Icon type="database" /><span>商品管理</span></span>}>
                {
                  subMenus.map(subMenu => {
                    return (
                      <Menu.Item 
                        key={subMenu.path}
                      >
                      {subMenu.title}
                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
              {menus.map(menu => {
                return (
                  <Menu.Item key={menu.path}>
                    <Icon type={menu.iconType} />
                    {this.state.collapsed ? "" : menu.title}
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            {/* 菜单缩起展开 */}
            <Header 
              className="draw-back"
              style={{ background: '#fff', padding: 0 }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(AppFrame);
