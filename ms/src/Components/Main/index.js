import React,{Component} from 'react'
import './index.css'
import Home from '../Home'
import Login from '../Login'
import Article from '../Article'
import { connect } from 'react-redux';

import { LoginShow, LoginState } from '../../redux/actions/login'



class Main extends Component {
  render() {
    return (
      <div id='Main'>
        <Home />
        <Login />
        {this.props.lostate ? <Article /> : ''}
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
    }
)(Main)