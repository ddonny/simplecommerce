import React,{Component, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { login_handle, login_bysocialaccount } from "../../redux/user.redux";
import { List, InputItem, WhiteSpace,Button,WingBlank,Toast, Checkbox, Flex } from 'antd-mobile';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './login.scss'
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import FocusWindow from '../../components/focuswindow/focuswindow'
const AgreeItem = Checkbox.AgreeItem;
const LoginForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    function clickHandle(){
        if(!username){
            Toast.fail("Please Input Your Username")
            return false;
        }else if(!password){
            Toast.fail("Please Input Your Password")
            return false;
        }
        dispatch(login_handle(
            username, password
        ))
    }
    function changeHandle(key,v){
        if (key === "username") {
            setUsername(v);
        } else {
            setPassword(v)
        }
    }
    return (
        <WingBlank className="wingblank-login">
            <FocusWindow/>
            <div className="wrapper-login">
                <List renderHeader={() => 'LOGIN'}>
                    <InputItem
                        clear
                        placeholder="Username"
                        onChange={v=>changeHandle("username",v)}
                        className="login-input-field"
                    >
                    </InputItem>
                    <InputItem
                        clear
                        placeholder="Password"
                        type="password"
                        onChange={v=>changeHandle("password",v)}
                        className="login-input-field"
                    >
                    </InputItem>
                </List>
                <Flex>
                    <Flex.Item>
                        {/* <AgreeItem data-seed="rememberme" onChange={e => console.log('checkbox', e)}> */}
                        <AgreeItem data-seed="rememberme">
                            Remember Me
                        </AgreeItem>
                    </Flex.Item>
                    <Flex.Item>
                        <Button className="btn-dark btn-login" size="small" onClick={() => clickHandle()}>Sign In</Button>
                    </Flex.Item>
                </Flex>                    
                <WhiteSpace/>
                <FacebookLogin
                    appId="2532274100321456"
                    fields="name,email,picture"
                    callback={props.responseFacebook}
                    autoLoad={false}
                    disableMobileRedirect={true}
                    textButton="Sign In with Facebook"
                    cssClass="facebook-signin-button"
                    icon={<FaFacebookF className="facebook-signin-button-icon"/>}
                />
                <WhiteSpace/>
                <GoogleLogin
                    clientId="2816717442-781455paii5afgg2nq2g70gjillj20lo.apps.googleusercontent.com"
                    // buttonText="Sign In with Google"
                    onSuccess={props.responseGoogle}
                    onFailure={props.responseGoogleFailed}
                    icon={false}
                    className="google-signin-button"
                    style={{
                        textAlign:'center',
                        alignItems:'center',
                        borderRadius: 50,
                        justifyContent: "center",
                    }}
                >
                    <FaGoogle className="google-signin-button-icon"/>
                    <div className="google-signin-button-text">Sign In with Google</div>
                </GoogleLogin>
                <WhiteSpace/>
            </div>
        </WingBlank>
    )
  }
@connect(state=>state.user,{
    login_bysocialaccount
})
class Login extends Component {   
    render (){
        const responseFacebook = (response) => {
            // console.log(response);
            if (response && response.email && response.id) {
                this.props.login_bysocialaccount({
                    email: response.email,
                    socialid: response.id
                })
            } else {
                // due to have restriction using https://m.facebook.com/dialog/oauth thus, we allow any response redirect to home
                this.props.login_bysocialaccount({
                    email: "sample@mail.com",
                    socialid: "xxxx"
                })
            }
        }
      
        const responseGoogle = (response) => {
            // console.log(response);
            if (response && response.profileObj) {
                this.props.login_bysocialaccount({
                    email: response.profileObj.email,
                    socialid: response.profileObj.googleId
                })
            }
        }

        const responseGoogleFailed = (response) => {
            Toast.fail("Failed to authenticate your Google Account")
        }
        
        return (
            <div className="bg-login">
                {this.props.redirect&&this.props.match.path!==this.props.redirect?<Redirect to={this.props.redirect}></Redirect>:null}
                    <LoginForm responseFacebook={(r) => responseFacebook(r)} responseGoogle={(r) => responseGoogle(r)} responseGoogleFailed={(r) => responseGoogleFailed(r)}/>
            </div>
        )
    }
}

export default Login