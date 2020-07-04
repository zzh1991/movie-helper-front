import React, { Component } from 'react';
import BasicLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { HomeFilled, HeartFilled, EyeFilled, StarFilled, AppstoreFilled } from '@ant-design/icons';

const { Footer } = Layout;

const MovieFooter = () => (
  <Footer style={{ textAlign: 'center', flexShrink: 0 }}>
    Movie Helper ©2020 Created by zzh
  </Footer>
);

const menuList = [
  {
    path: '/recent',
    name: '上映电影',
    icon: <HomeFilled />,
    exact: true,
  },
  {
    path: '/top',
    name: 'Top 100',
    icon: <StarFilled />,
    exact: true,
  },
  {
    path: '/view',
    name: '已观影',
    icon: <EyeFilled />,
    exact: true,
  },
  {
    path: '/star',
    name: '想看',
    icon: <HeartFilled />,
    exact: true,
  },
  {
    path: '/all',
    name: '全部电影',
    icon: <AppstoreFilled />,
    exact: true,
  },
];

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

  onMenuChick = (path) => {
    const { history } = this.props;
    history.push(path);
    this.setState({
      menuKey: path,
    });
  }

  render() {
    const { children } = this.props;
    const { menuKey } = this.state;
    return (
      <BasicLayout
        title=""
        // logo="https://i.loli.net/2020/02/29/EQsTMSBYLC4kxiq.png"
        logo={() => (
          <span
            onClick={() => this.onMenuChick('/recent')}
            onKeyPress={() => this.onMenuChick('/recent')}
          >
            <img
              src="https://i.loli.net/2020/02/29/EQsTMSBYLC4kxiq.png"
              alt="logo"
              height="64px"
            />
          </span>
        )}
        layout="topmenu"
        collapsed
        route={
          {
            routes: menuList,
          }
        }
        footerRender={() => <MovieFooter />}
        menuItemRender={(props, defaultDom) => (
          <span
            onClick={() => this.onMenuChick(props.path)}
            onKeyPress={() => this.onMenuChick(props.path)}
          >
            {defaultDom}
          </span>
        )}
        menuProps={{
          selectedKeys: [menuKey],
        }}
      >
        {children}
      </BasicLayout>
    );
  }
}

export default withRouter(MoviePageContainer);
