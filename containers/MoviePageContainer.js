import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import {
  HomeFilled, HeartFilled, EyeFilled, StarFilled, AppstoreFilled,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

class MoviePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuKey: this.getDefaultMenu(),
    };
  }

  getDefaultMenu = () => {
    // eslint-disable-next-line no-undef
    const path = window.location.hash.substr(1);
    if (path === undefined || path === '/') {
      return '/recent';
    }
    return path;
  }

  onMenuChick = (menu) => {
    const { history } = this.props;
    const { menuKey } = this.state;
    if (menu.key === menuKey) {
      return;
    }
    history.push(menu.key);
    this.setState({
      menuKey: menu.key,
    });
  }

  render() {
    const { children } = this.props;
    const { menuKey } = this.state;
    return (
      <Layout>
        {window.outerWidth >= 1000 && (
        <Header>
          <span
            style={{
              float: 'left',
              fontSize: 24,
              marginRight: 48,
              cursor: 'pointer',
            }}
            onClick={() => this.onMenuChick({ key: '/recent' })}
            onKeyPress={() => this.onMenuChick({ key: '/recent' })}
          >
            电影助手
          </span>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={this.onMenuChick}
            defaultSelectedKeys={[menuKey]}
          >
            <Menu.Item key="/recent" icon={<HomeFilled />}>
              上映电影
            </Menu.Item>
            <Menu.Item key="/top" icon={<StarFilled />}>
              Top
            </Menu.Item>
            <Menu.Item key="/view" icon={<EyeFilled />}>
              已看
            </Menu.Item>
            <Menu.Item key="/star" icon={<HeartFilled />}>
              想看
            </Menu.Item>
            <Menu.Item key="/all" icon={<AppstoreFilled />}>
              所有电影
            </Menu.Item>
          </Menu>
        </Header>
        )}
        <Content style={{ margin: 24 }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Movie Helper ©2020 Created by zzh
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(MoviePageContainer);
