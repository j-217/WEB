import React from "react";
import ReactDom from "react-dom";
import { HashRouter as Router, Route, Link } from 'react-router-dom'

// 导入自定义组件
import HomeContainer from './components/Home/HomeContainer.jsx'
import MovieContainer from './components/Movie/MovieContainer.jsx'
import AboutContainer from './components/About/AboutContainer.jsx'

// ---- ant design ----
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;
// ---- antd end -----

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  };

  render(){
    return(
      <Router>
      <Layout style={{ height:'100%' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
        <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.hash.split('/')[1]]}
        style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="home"><Link to="/home" replace>首页</Link></Menu.Item>
          <Menu.Item key="movie"><Link to="/movie/in_theaters/1" replace>电影</Link></Menu.Item>
          <Menu.Item key="about"><Link to="/about" replace>关于</Link></Menu.Item>
        </Menu>
      </Header>

      <Content style={{ marginTop: 64 }}>
      <div style={{ background: '#fff', height: '100%'}}>
        <Route path="/home" component={HomeContainer}></Route>
        <Route path="/movie" component={MovieContainer}></Route>
        <Route path="/about" component={AboutContainer}></Route>
      </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>React Douban Movie ©2019 Created by J_217</Footer>
      </Layout>
      </Router>
    )
  }
}

ReactDom.render(<Index></Index>, document.getElementById("root"))