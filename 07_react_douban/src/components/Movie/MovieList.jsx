import React from 'react'
import fetchJSONP from 'fetch-jsonp'

import { Spin, Icon, Pagination } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import MovieItem from './MovieItem.jsx'

require('../../css/movieList.css')

export default class MovieList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            nowPage: parseInt(props.match.params.page) || 1,
            count: 12,
            total: 0,
            movieType: props.match.params.type,
            isLoading: true,
        }
    }


    UNSAFE_componentWillMount(){
        this.loadMovieListByTypeAndPage()
    }


    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            nowPage: parseInt(nextProps.match.params.page) || 1,
            movieType: nextProps.match.params.type,
            isLoading: true,
        })
        this.loadMovieListByTypeAndPage()
    }

    loadMovieListByTypeAndPage = ()=>{
        let start = (this.state.nowPage - 1) * this.state.count
        let count = this.state.count
        // let url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${count}`

        // dummy data
        let url = '../../testData/' +this.state.movieType+ '.json'


        // fetchJSONP(url)
        fetch(url)
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            this.setState({
                movies: data.subjects,
                total: data.total,
                isLoading: false,
            })
        })
    }

    changePage = (page)=>{
        this.props.history.push('/movie/' + this.state.movieType + '/' + page)
    }

    renderList = ()=>{
        if(this.state.isLoading){
            return(
                <Spin indicator={antIcon} />
            )
        }else{
            return(
                <div>
                    <div className="movieList">
                    {this.state.movies.map((item)=>{
                        return ( <MovieItem {...item} key={item.id} parentHistory={this.props.history}></MovieItem> )
                    })}
                    </div>
                    <Pagination 
                    defaultCurrent={this.state.nowPage} 
                    total={this.state.total} 
                    defaultPageSize={this.state.count}
                    onChange={this.changePage}
                    />
                </div>
            )
        }
    }

    render(){
        return(
            this.renderList()
        )
    }
}