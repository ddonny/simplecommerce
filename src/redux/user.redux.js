import axios from "axios";
import {Toast} from "antd-mobile";
import {getRedirectPath} from "../util";
import {getCategoriesAndProduct} from "./list.redux"

const ERROR = "ERROR";
const UPDATE_INFO_SUCCESS = "UPDATE_INFO_SUCCESS";
const GETINFO = 'GETINFO';
const LOGOUT = "LOGOUT";

const initState = {
    redirect:"",
    msg:"",
    username:"",
    type:"",
    socialid:null
}

//reducer
export function user(state=initState,action){
    switch(action.type){
        case UPDATE_INFO_SUCCESS:
            return {
                ...state,
                ...action.data,
                redirect:getRedirectPath(action.data),
                msg: ""
            }
        case GETINFO:
            return {
                ...state,
                ...action.data
            }
        case LOGOUT:
            return {
                ...initState,
                redirect: "/login"
            }
        case ERROR:
            return {
                ...state,
                msg:action.msg
            }
        default:
            return state
    }
}

//info action
export function info(data){
    return {
        data,
        type: GETINFO
    }
}

//error action
export function handle_error(msg){
    return {
        msg,
        type: ERROR
    }
}

//get captcha
export function getCaptcha({username,callback}){
    return dispatch=>{
        axios.post("/user/getCaptcha",{username}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    callback(res.captcha,res.time);
                });
            }else{
                Toast.fail(res.msg);
            }
        }).catch(err=>{
            Toast.fail("Request Error");
        })
    }
}

//login action
export function login_handle(usernameParam, passwordParam){
    return dispatch=>{
        // with auth -- skipped
        // axios.post("/user/login",{usernameParam,passwordParam}).then(res=>{
        //     if(res.code===1){
        //         Toast.success(res.msg, 2, ()=>{
        //             dispatch(updateInfoSuccess(res.data));
        //         });
        //     }else{
        //         Toast.fail(res.msg,2,()=>{
        //             dispatch(handle_error(res.msg))
        //         });
        //     }
        // }).catch(err=>{
        //     Toast.fail("Request Error",2,()=>{
        //         dispatch(handle_error("Request Error"))
        //     });
        // })
        // without auth
        dispatch(updateInfoSuccess({
            username: usernameParam,
            socialid: null
        }));
        dispatch(getCategoriesAndProduct())
    }
}

export function login_bysocialaccount({usernameParam, socialidParam}) {
    return dispatch=>{
        dispatch(updateInfoSuccess({
            username: usernameParam,
            socialid: (socialidParam) ? socialidParam : null
        }));
        dispatch(getCategoriesAndProduct())
    }
}

//Register Action
export function register({username,password,type,yzm}){
    return dispatch => {
        axios.post("/user/register",{username,password,type,yzm}).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(updateInfoSuccess({username,type}));
                });
            }else{
                Toast.fail(res.msg,2,()=>{
                    dispatch(handle_error(res.msg))
                });
            }
        }).catch(err=>{
            Toast.fail("Request Error",2,()=>{
                dispatch(handle_error("Request Error"))
            });
        })
    }
}

//UPDATE_INFO_SUCCESS action
export function updateInfoSuccess(data){
    return {
        data,
        type:UPDATE_INFO_SUCCESS
    }
}

//updateInfo action
export function updateInfo(data,callback){
    return dispatch=>{
        axios.post("/user/updateInfo",data).then(res=>{
            if(res.code===1){
                Toast.success(res.msg, 2, ()=>{
                    dispatch(updateInfoSuccess(data))
                    callback&&callback();
                });
            }else{
                Toast.fail(res.msg,2,()=>{
                    dispatch(handle_error(res.msg))
                });
            }
        }).catch(err=>{
            Toast.fail("Request Error",2,()=>{
                dispatch(handle_error("Request Error"))
            });
        })
    }
}

//logout action
export function logout(){
    return {
        type:  LOGOUT
    }
}