import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import {LoginShow,LoginState} from '../../redux/actions/login'


class Home extends Component {
  state={
    isLogin:JSON.parse(localStorage.getItem('isLogin')),
  }
  Login = () => {
    this.props.LoginShow(true);
  } 

  render() {
    return (
        <div className='home' style={{display:this.props.lostate?'none':'block'}}>
            <div className='title'>Let's build from here</div>
        <button className='login' onClick={this.Login}>Sign in</button>
        </div>
    )
  }
}


export default connect(
  state => ({ show: state.deng.loginshow,lostate:state.deng.loginstate }),
  {LoginShow,LoginState}
)(Home)