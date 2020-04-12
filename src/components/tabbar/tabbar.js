import React, { useState } from "react";
import { TabBar } from 'antd-mobile';
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";
import Primo from './../../container/primo/primo'
import Purchaselist from './../../container/purchaselist/purchaselist'
import './tabbar.scss'
const TabFunct = (props) => {
    const [selectedTab, setSelectedTab] = useState("Home")
    // eslint-disable-next-line
    const [tabReference, setTabReference] = useState([
        {
            key: "Home",
            title: "Home",
            isTab: true,
            referenceComponent: Primo
        },
        {
            key: "Feed",
            title: "Feed",
            isTab: true,
            referenceComponent: null
        },
        {
            key: "Cart",
            title: "Cart",
            isTab: true,
            referenceComponent: null
        },
        {
            key: "Profile",
            title: "Profile",
            isTab: false,
            path: "/purchaselist",
            referenceComponent: Purchaselist
        }
    ])
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const dispatch = useDispatch();
    // function clickHandle(){
    //     if(!username){
    //         Toast.fail("Please Input Your Username")
    //         return false;
    //     }else if(!password){
    //         Toast.fail("Please Input Your Password")
    //         return false;
    //     }
    //     dispatch(login_handle(
    //         username, password
    //     ))
    // }
    // function changeHandle(key,v){
    //     if (key === "username") {
    //         setUsername(v);
    //     } else {
    //         setPassword(v)
    //     }
    // }
    // function actionSetPassword(v) {
    //     setPassword(v)
    // }
    // function actionSetUsername(v) {
    //     setUsername(v)
    // }
    function renderContent(v) {
        if (v.referenceComponent && v.referenceComponent != null) {
            let Component = v.referenceComponent;
            return (<Component/>)
        } else {
            return (<div></div>)
        }
    }
    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            >
                {tabReference.map((val, idx) => (
                    <TabBar.Item
                        title={val.title}
                        key={val.key}
                        // icon={<div style={{
                        //     width: '22px',
                        //     height: '22px',
                        //     background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                        // />
                        // }
                        // selectedIcon={<div style={{
                        // width: '22px',
                        // height: '22px',
                        // background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                        // />
                        // }
                        selected={
                            selectedTab === val.key
                        }
                        onPress={() => {
                            (val.isTab) ?
                            setSelectedTab(val.key)
                            :
                            props.history.push(val.path)
                        }}
                        data-seed={val.key}
                    >
                        {renderContent(val)}
                    </TabBar.Item>
                ))}
            </TabBar>
    )
}
@withRouter
@connect(state=>state.user,{
})
class Tabbar extends React.Component{
    static propTypes = {
        tabList: PropTypes.array
    }
    render(){
        return (
            <div className="tab-list">
                <TabFunct history={this.props.history}/>
            </div>
        )
    }
}

export default Tabbar