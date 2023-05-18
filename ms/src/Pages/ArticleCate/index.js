import React, { Component } from 'react'
import './index.css'
import img from '../../dist/static/maotou.jpg'
import { connect } from 'react-redux';

class Articlecate extends Component {
  state = {
    ArticleList: this.props.article.length === 0?[]:this.props.article,
  }
  componentDidMount() {
    console.log('123',this.props.article);
  }

  render() {
    return (
      <div id="ArticleCate">
        <div className="Article_Show">
          <ul className="Article_ul"> 
            {
              this.state.ArticleList.length === 0?'':this.state.ArticleList.map((item, index) => {
                return (
                  <li className="Article_li" key={index}>
                    <div className="Article_main">
                      <div className="Article_writer">
                        About Writer:
                        <span className='writer_name'>{ item.nickname}</span>
                        <span className='writer_age'>{ item.age}</span>
                        <span className='writer_sex'>{ item.sex === 1?'man':'women'}</span>
                      </div>
                      <div className="Article_header">Header:{item.title}</div>
                      <div className="Article_context">Content:{ item.content}</div>
                    </div>
                    <div className="Article_img">
                      <img src={img} alt="" />
                    </div>
                  </li>
                )
              })
              
            }
          </ul>
          
        </div>
        <div className="Article_classify">
          321
        </div>
      </div>
    )
  }
}


export default connect(
  state => ({
    article:state.article
  })
)(Articlecate)