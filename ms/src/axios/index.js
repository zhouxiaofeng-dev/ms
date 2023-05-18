// import axios from 'axios';
import http from './http'
import qs from 'qs';
http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000'

export default function New_Axios() {
    const myaxios = {
        post(url, data) {
            let NewData = Object.prototype.toString.call(data) === '[object FormData]' ? data : qs.stringify(data);
            return new Promise((resolve, reject) => { 
                http.post(url, NewData).then((data) => {
                    resolve(data.data);
                }, (err) => {
                    reject(err);
                });
            })
        },
        get(url, data) {
            return new Promise((resolve, reject) => { 
                http.get(url, data).then((data) => {
                    resolve(data.data);
                }, (err) => {
                    reject(err);
                })
            })
        }
    }
    return  myaxios
}

