import React,{Component} from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import { NavBar,Icon } from "antd-mobile";
import './purchaselist.scss';
import ProductList from '../../components/product-list/product-list';
import FocusWindow from "../../components/focuswindow/focuswindow";
@withRouter
@connect(state=>state,{
})
class Purchaselist extends Component{    
    render(){
        const purchaseList = this.props.listData.purchaseList
        return (
            <div className="purchaselist-page">
                <FocusWindow/>
                <NavBar
                    mode="light"  
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                    ]}
                    className="navbar-purchaselist"
                    >
                    Purchase History
                </NavBar>
                <ProductList productListData={purchaseList} purchaseListMode/>
            </div>
        )
    }
}

export default Purchaselist