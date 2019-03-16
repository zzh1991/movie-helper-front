import React from 'react';
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import '../styles/style.css';

const {
  Header, Content, Sider, Footer,
} = Layout;
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toPath = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  clickMenu = (e) => {
    this.toPath(e.key);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ height: '100vh' }}>
        <Header
          className="header"
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 5fr',
          }}
        >
          <div style={{ fontSize: 20, color: 'white', marginLeft: -30 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {'  电影助手'}
          </div>
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
              theme="dark"
              mode="inline"
              onClick={this.clickMenu}
              defaultSelectedKeys={[window.location.hash.substr(1)]}
            >
              <Menu.Item key="/">
                <Icon type="home" />
                <span>上映电影</span>
              </Menu.Item>
              <Menu.Item key="/top">
                <Icon type="heart" />
                <span>Top 100</span>
              </Menu.Item>
              <Menu.Item key="/view">
                <Icon type="eye" />
                <span>已观影</span>
              </Menu.Item>
              <Menu.Item key="/star">
                <Icon type="star" />
                <span>想看</span>
              </Menu.Item>
              <Menu.Item key="/all">
                <Icon type="appstore" />
                <span>所有电影</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: 20, overflowY: 'hidden' }}>
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Movie Helper ©2019 Created by zzh
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(SideBar);
