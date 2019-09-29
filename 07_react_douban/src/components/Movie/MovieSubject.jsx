import React from 'react'
import fetchJSONP from 'fetch-jsonp'

import { Spin, Icon, Button } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

require('../../css/movieSubject.css')

export default class MovieSubject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie: {},
            isLoading: true,
        }
    }

    UNSAFE_componentWillMount(){
        this.loadSubject()
    }

    loadSubject = ()=> {
        // dummy data
        let url = '../../testData/subject.json'
        fetch(url)

        // let url = `https://douban.uieee.com/v2/movie/subject/${this.props.match.params.id}`
        // fetchJSONP(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                movie: data,
                isLoading: false,
            })
        })
    }

    goBack = () => {
        // console.log(this.props)
        this.props.history.go(-1)
    }

    renderSubject = ()=> {
        if(this.state.isLoading){
            return(
                <Spin indicator={antIcon} />
            )
        }else{
            return(
            <div className="movieSubject">
                <Button type="primary" onClick={this.goBack}>
                    <Icon type="left" />
                    返回电影列表
                </Button>
                <div className="detail">
                    <img scr={this.state.movie.images.large}></img>
                    <h4>电影名称：{this.state.movie.aka[0]}</h4>
                    <p>简介：{this.state.movie.summary}</p>
                </div>
            </div>
            )
        }
    }

    render(){
        return(
            this.renderSubject()
        )
    }
}