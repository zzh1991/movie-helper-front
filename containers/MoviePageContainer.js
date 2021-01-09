import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import {
  HomeFilled, HeartFilled, EyeFilled, StarFilled, AppstoreFilled,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Content } = Layout;

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
      <PageDisplay>
        {window.outerWidth >= 1000 && (
        <PageHeader>
          <PageHeaderTitle
            onClick={() => this.onMenuChick({ key: '/recent' })}
            onKeyPress={() => this.onMenuChick({ key: '/recent' })}
          >
            电影助手
          </PageHeaderTitle>
          <Menu
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
        </PageHeader>
        )}
        <Content style={{ margin: 24 }}>
          {children}
        </Content>
        <PageFooter>
          Movie Helper ©2017-2021 Created by zzh
        </PageFooter>
      </PageDisplay>
    );
  }
}

const PageDisplay = styled.div`
display: grid;
grid-template-rows: auto 1fr auto;
height: 100vh;
`;

const PageHeader = styled.div`
display: grid;
grid-template-columns: auto 1fr;
`;

const PageHeaderTitle = styled.div`
cursor: pointer;
display: grid;
align-items: center;
margin-left: 24px;
margin-right: 24px;
font-size: 18px;
`;

const PageFooter = styled.div`
display: grid;
place-items: center;
margin: 8px;
`;

export default withRouter(MoviePageContainer);
