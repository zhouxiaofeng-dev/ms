import { LOGINSHOW,LOGINSTATE } from '../constant'


// const initState = {loginshow:false,loginstate:false};
export default function LoginReducer(preState, action) {
    if (preState === undefined) {
        preState = {
            loginshow: false,
            loginstate:false,
        }
    }
    const { type, data } = action;
    let newState = {};
    switch (type) {
        case LOGINSHOW:
            preState.loginshow = data;
            newState = { ...preState };
            return newState
        case LOGINSTATE:
            preState.loginstate = data;
            newState = { ...preState };
            return newState
        default:
            return preState;
    }
}