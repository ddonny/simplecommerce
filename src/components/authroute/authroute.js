import {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import { info } from "../../redux/user.redux";

@withRouter
@connect(null,{
    info
})
class AuthRoute extends Component{
    componentDidMount(){
        const pathName = ["/login","/register"];
        let path = this.props.location.pathname;
        if(pathName.indexOf(path)>-1){
            return null
        }
    }

    render(){
        return null;
    }
}

export default AuthRoute