import React, { Component } from 'react'
import './index.css'
import { connect } from 'react-redux'; 
import { changUser } from '../../redux/actions/user';
import img from '../../dist/static/maotou.jpg'


class MyUser extends Component {
  state = {
    change: false,
  }

  //修改个人信息
  changeUserIMF = () => {
    const input = document.getElementsByClassName('myUser_input');
    const box = document.getElementsByClassName('myUser_box');
    if (this.state.change) {
      //接收原本的user
      let NewUser = this.props.user;
      const jian = ['username', 'nickname', 'sex', 'age', 'email'];
      //修改user的信息
      for (let i = 0; i < jian.length; i++) {
        NewUser[jian[i]] = input[i].value;
      }
      //传入redux中
      this.props.changUser(NewUser);
      console.log(NewUser);
      //修改显示
      for (let i = 0; i < box.length; i++) {
        box[i].style.display = 'block';
        input[i].style.display = 'none';
      }
      this.setState({ change: false });
      // const id = NewUser.id
      //传入数据库
      React.$axios.post('/my/updateUserinfo', NewUser, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res)=> {
        alert(res.message)
      }, (err) => {
        React.MyError(err);
      })
    } else {
      //修改显示
      for (let i = 0; i < box.length; i++){
        input[i].value = box[i].innerText;
        box[i].style.display = 'none';
        input[i].style.display = 'block';
      }
      this.setState({ change: true });
    }
  }

  //修改密码
  changePwd = () => {
    const oldPwd = document.getElementsByClassName('newPassword')[0].value;
    const newPwd = document.getElementsByClassName('newPassword')[1].value;
    React.$axios.post('/my/updatepw', { oldPwd, newPwd }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      alert(res.message)
      console.log(res);
    }, err => {
      React.MyError(err);
    })
  }

  render() {
    return (
      <div id="myUser">
        <div className="myUser_IMF">
          <div className='myUserImf_header'>User Information</div>
          <ul>
            <li className='myUser_item'>
              <span className='myUser_show'>Username:</span>
              <input type="text" className='myUser_input' />
              <div className="myUser_box">{this.props.user.username}</div>
            </li>
            <li className='myUser_item'>
              <span className='myUser_show'>Nickname:</span>
              <input type="text" className='myUser_input' />
              <div className="myUser_box">{this.props.user.nickname?this.props.user.nickname:'need change'}</div>
            </li>
            <li className='myUser_item'>
              <span className='myUser_show'>Sex:</span>
              <input type="text" className='myUser_input' />
              <div className="myUser_box">{this.props.user.sex?this.props.user.sex:'need change'}</div>
            </li>
            <li className='myUser_item'>
              <span className='myUser_show'>Age:</span>
              <input type="text" className='myUser_input' />
              <div className="myUser_box">{this.props.user.age?this.props.user.age:'need change'}</div>
            </li>
            <li className='myUser_item'>
              <span className='myUser_show'>Email:</span>
              <input type="text" className='myUser_input' />
              <div className="myUser_box">{this.props.user.email?this.props.user.email:'need change'}</div>
            </li>
          </ul>
        <div className="myUser_pic">
          <img src={img} alt="" />
        </div>
        <button className="changeUserIMF" onClick={this.changeUserIMF}>{this.state.change?'Confirm':'Change'}</button>
        </div>
        <div className="myUser_pwd">
          <div className='myUserImf_header'>Change Password</div>
          <div className="changePassword">
            <span className="changepwd_head">Old Password:</span>
            <input type="text" className='myUser_input newPassword' />
          </div>
          <div className="changePassword">
            <span className="changepwd_head">New Password:</span>
            <input type="text" className='myUser_input newPassword' />
          </div>
          <button className='changePwdBtn' onClick={ this.changePwd}>Change</button>
        </div>
      </div>
    )
  }
}


export default connect(
  state => ({
    user:state.user
  }),
  {
    changUser
  }
)(MyUser)