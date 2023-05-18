import React, { Component } from 'react'
import './index.css'
import img from '../../dist/static/maotou.jpg'
// import axios from 'axios''

export default class Write extends Component {

  state = {
    user_img:img
  }

  changeImg = () => {
    const file = document.getElementById('file').files[0];
    //选择图片
    let reader = new FileReader();
    const that = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      that.setState({
        user_img:this.result
      })
    }
  }


  Write_A_Article = () => {
    const form = new FormData();
    //获取标题
    const title = document.getElementsByClassName('WriteHead')[0].value;
    //获取内容
    const content = document.getElementsByClassName('WriteContent')[0].value;
    const cate_id = Math.floor(Math.random(0, 1)*10000);
    const file = document.getElementById('file').files[0];

    form.append("title", title);
    form.append("content", content);
    form.append("cate_id", cate_id);
    form.append("state", "已发布");
    form.append("cover_img", file);

    React.$axios.post('/article/add', form, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
    }).then(res => {
      alert(res.message);
    }, err => {
      React.MyError(err);
    }) 
  }

  render() {
    return (
      <div id='Write'>
        <div className="Write_header">
          <span>Header:</span>
          <input type="text" className='WriteHead'/>
        </div>
        <div className='Write_content'>
          <span>Context:</span>
          <textarea   className='WriteContent'/>
        </div>
        <button className='sumbitArticle' onClick={this.Write_A_Article}>Sumbit</button>
        <div className="uploadImg">
          <img src={this.state.user_img} alt="" />
          <input type="file" id="file" capture="user" onChange={ this.changeImg} />
        </div>
      </div>
    )
  }
}
