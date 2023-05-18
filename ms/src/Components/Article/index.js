import React, { Component } from 'react'
import './index.css'

import { NavLink, Route,Switch,Redirect } from 'react-router-dom';
import MyUser from '../../Pages/MyUser'
import Write from '../../Pages/Write'
import ArticleCate from '../../Pages/ArticleCate'

import { connect } from 'react-redux';
import { LoginShow, LoginState } from '../../redux/actions/login'
import { changUser } from '../../redux/actions/user';
import {getArticle} from '../../redux/actions/article'


class Article extends Component {
  componentDidMount() {
    React.$axios.get('/article/getArticle').then(res => {
      let data = res.data
      data.map((obj,index) => {
        return new Promise(async (resolve, reject) => { 
          await React.$axios.post('/user/userForId', {
            id:obj.author_id
          }).then(res => { 
            data[index] = { ...res.data[0], ...data[index] }
          }, err => {
            React.MyError(err);
          })
        })
      })
      this.props.getArticle(data)
    }, err => {
      React.MyError(err);
    })
  } 

  render() {
    return (
      <div id='article'>
        <div className="header">
          <span>Article Management</span>
        </div>
        <div className="article_main">
          <div className="sidebar">
            <ul className='chooseList'>
              <li>
                <NavLink to="/myuser" activeClassName='ActiveSytle chooselist_A' className='chooselist_A'>My User</NavLink>
              </li>
              <li>
                <NavLink to="/write" activeClassName='ActiveSytle chooselist_A' className='chooselist_A'>Write someone</NavLink>
              </li>
              <li>
                <NavLink to="/articlecate" activeClassName='ActiveSytle chooselist_A' className='chooselist_A'>just comment</NavLink>
              </li>
            </ul>
          </div>
          <div className="context_main">
            <Switch>
              <Route path="/myuser"  component={MyUser} />
              <Route path="/write"   component={Write} />
              <Route path="/articlecate" component={ArticleCate} />
              <Redirect from='/*' to="/"/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(
  state => ({
    show: state.deng.loginshow,
    lostate: state.deng.loginstate,
    user:state.user
  }),
  {
    LoginShow,
    LoginState,
    changUser,
    getArticle,
  }
)(Article)