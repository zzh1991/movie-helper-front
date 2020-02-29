import React, { Component } from 'react';
import BasicLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
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
    // key: '/recent',
  },
  {
    path: '/top',
    name: 'Top 100',
    icon: <HeartFilled />,
    // key: '/top',
  },
  {
    path: '/view',
    name: '已观影',
    icon: <EyeFilled />,
    // key: '/view',
  },
  {
    path: '/star',
    name: '想看',
    icon: <StarFilled />,
    // key: '/star',
  },
  {
    path: '/all',
    name: '全部电影',
    icon: <AppstoreFilled />,
    // key: '/all',
  },
];

class MoviePageContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <BasicLayout
        title="电影助手"
        contentStyle={{ height: 'calc(100vh - 200px)' }}
        logo="https://i.loli.net/2020/02/29/EQsTMSBYLC4kxiq.png"
        // logo={() => (
        //   <a href="/">
        //     <img
        //       src="https://i.loli.net/2020/02/28/hDKMbkNLI4uAQUx.png"
        //       alt="logo"
        //       height="64px"
        //     />
        //   </a>
        // )}
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
