import React from 'react'
import {Rate} from 'antd'

require('../../css/movieItem.css')

export default class MovieItem extends React.Component{
    constructor(props){
        super(props);
    }

    // 通过父组件传递的history属性，使用其中的push方法进行页面跳转
    getSubject = ()=>{
        let url = '/movie/subject/' + this.props.id
        this.props.parentHistory.push(url)
    }

    render(){
        return(
            <div className="movieItem" onClick={this.getSubject}>
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569396622621&di=f9475d1e7ed4f7ebe9833a53f7518d5e&imgtype=0&src=http%3A%2F%2Fpic149.nipic.com%2Ffile%2F20171217%2F9468980_095747574000_2.jpg"></img>
                <div className="details">
                    <h4>电影名称：{this.props.title}</h4>
                    <h5>上映时间：{this.props.mainland_pubdate}</h5>
                    <h5>电影类型：{this.props.genres.join(',')}</h5>
                    <Rate disabled allowHalf defaultValue={Math.round(this.props.rating.average) / 2} />
                </div>
            </div>
        )
    }
}