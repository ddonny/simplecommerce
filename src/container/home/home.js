import React,{Component} from "react";
import {connect} from "react-redux";
import {updateInfo} from "../../redux/user.redux";
import {getCategoriesAndProduct} from "../../redux/list.redux";
import Tabbar from '../../components/tabbar/tabbar';
import FocusWindow from '../../components/focuswindow/focuswindow'
import './home.scss'
@connect(state=>state,{
    updateInfo,
    getCategoriesAndProduct
})
class Home extends Component{
    render(){
        return (
            <div className="base-page">
                <FocusWindow/>
                <Tabbar/>
            </div>
        )
    }
}

export default Home