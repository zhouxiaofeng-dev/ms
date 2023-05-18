import React from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux';
import { LoginShow, LoginState } from '../../redux/actions/login'
import { changUser } from '../../redux/actions/user';


class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  changeData = (datatype) => {
    return (e)=>{
      this.setState({[datatype]:e.target.value})
    }
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    const { username, password } = this.state;
    React.$axios.post('/user/login', { username, password }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      if (res.status === 1) {
        alert(res.message);
      } else {
        //存储token
        localStorage.setItem('token', res.data.token);
        //登录成功，存储user数据
        localStorage.setItem('user',JSON.stringify({
          username,
          password
        }));
        //保存用户信息
        this.props.changUser(res.data.userIMF)
        //修改登录状态为已登录
        this.props.LoginState(true);
        alert('登录成功');
        //退出登录界面
        this.props.LoginShow(false);
      }
    }, (err) => {
      React.MyError(err);
    })
    this.props.history.push('/myuser');
  }
  Login = () => {
    // let user = {
    //   username: '123456',
    //   password: '123456',
    // }
    // React.$axios.post('/user/login',user).then((res, any) => {
    //   console.log(res);
    // })
    // axios.post('http://127.0.0.1:3300/user/regiser',user).then((res, any) => {
    //   console.log(res);
    // })
  }
  
  render() {
    return (
        <div id='Login' style={{display:this.props.show?'block':'none'}}>
            <div className="mask"></div>
            <div className="Login-interface">
                <div className="Login-img"></div>
                <div className="Login-password">
                    <p>密码登录</p>
                <form action="" onSubmit={this.handleSubmit}>
              <input type="text" ref={c => this.username = c}  onChange={this.changeData('username')} className='username' placeholder='请输入邮箱/手机号' name="username" autoComplete='off'/>
                  <input type="password" onChange={this.changeData('password')} className='password' placeholder='请输入密码' name="password" autoComplete="true"/>
                  <span className="forgetPassword">修改密码</span>
                  <button className='Login' onClick={this.Login}>登录</button>
                </form>
                    <div className="changeIdentify">注册</div>
                </div>  
                <div className="userAgreement">注册登录即表示同意用户协议和隐私政策</div>
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
    changUser
  }
)(withRouter(Login))