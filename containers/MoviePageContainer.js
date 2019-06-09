import React, { Component } from 'react';
import BasicLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const MovieFooter = () => (
  <Footer style={{ textAlign: 'center', flexShrink: 0 }}>
    Movie Helper ©2019 Created by zzh
  </Footer>
);

const menuList = [
  {
    path: '/recent',
    name: '上映电影',
    icon: 'home',
    // key: '/recent',
  },
  {
    path: '/top',
    name: 'Top 100',
    icon: 'heart',
    // key: '/top',
  },
  {
    path: '/view',
    name: '已观影',
    icon: 'eye',
    // key: '/view',
  },
  {
    path: '/star',
    name: '想看',
    icon: 'star',
    // key: '/star',
  },
  {
    path: '/all',
    name: '全部电影',
    icon: 'appstore',
    // key: '/all',
  },
];

class MoviePageContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <BasicLayout
        title="电影助手"
        logo={false}
        // logo="https://i.loli.net/2019/06/07/5cfa719a2f89437772.png"
        // logo={() => <a href="/"><img src="https://i.loli.net/2019/06/07/5cfa719a2f89437772.png" alt="icon" /></a>}
        layout="topmenu"
        collapsed
        // menuDataRender={() => {
        //   return menuList.map((item) => {
        //     return item;
        //   });
        // }}
        route={
          {
            routes: menuList,
          }
        }
        footerRender={() => <MovieFooter />}
        menuItemRender={(props, defaultDom) => (
          <Link to={props.path}>{defaultDom}</Link>
        )}
      >
        {children}
      </BasicLayout>
    );
  }
}

export default MoviePageContainer;
