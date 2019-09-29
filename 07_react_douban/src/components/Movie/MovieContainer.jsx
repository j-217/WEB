import React from 'react'

import { Layout, Menu, Icon } from 'antd';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import MovieList from './MovieList.jsx'
import MovieSubject from './MovieSubject.jsx'

export default class MovieContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Router>
            <Layout style={{ height:'100%' }}>
            <Sider width={200} style={{ background: '#fff' }}>
            <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split('/')[2]]}
            style={{ height: '100%' }}
            >
                <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1" replace>正在热映</Link></Menu.Item>
                <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1" replace>即将上映</Link></Menu.Item>
                <Menu.Item key="top250"><Link to="/movie/top250/1" replace>Top250</Link></Menu.Item>
            </Menu>
            </Sider>

            <Layout style={{ paddingLeft: '3px' }}>
            <Content
            style={{
                background: '#fff',
                padding: '5px 10px',
                minHeight: 280,
                overflow: 'scroll-y',
            }}
            >
            <Switch>
                <Route path="/movie/subject/:id" component={MovieSubject}></Route>
                <Route path="/movie/:type/:page" component={MovieList}></Route>
            </Switch>
            </Content>
            </Layout>
            </Layout>
            </Router>
        )
    }
}