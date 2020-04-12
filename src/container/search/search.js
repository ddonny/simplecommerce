import React,{Component, useRef, useState, useEffect} from "react";
import { withRouter } from "react-router-dom";
import { NavBar,Icon, SearchBar } from "antd-mobile";
import {getCategoriesAndProduct, setSearchInputtedValue} from "../../redux/list.redux";
import {IoIosCloseCircleOutline} from 'react-icons/io';
import ProductList from '../../components/product-list/product-list';
import './search.scss';
import { connect, useDispatch } from "react-redux";
import FocusWindow from "../../components/focuswindow/focuswindow";

const FocusInputSearchBar = (props) => {
    const searchBarInputElement = useRef()
    const [valueInput, setValueInput] = useState("")
    const dispatch = useDispatch();
 
    const setFocusInputSearchBar = () => {
        searchBarInputElement.current.focus()
    }
    useEffect(() => {
        if (props.productList.length === 0) {
            dispatch(getCategoriesAndProduct())
        }
        setFocusInputSearchBar()
    })
    function onChange(value) {
        dispatch(setSearchInputtedValue(value))
        setValueInput(value)
    };
    return (
       <React.Fragment>
            <SearchBar
                value={valueInput}
                placeholder="Type your keyword to find"
                showCancelButton={false}
                onChange={onChange}
                ref={searchBarInputElement}
                cancelText={<IoIosCloseCircleOutline key="cancel" className="cancel-search-icon"/>}
            />
        </React.Fragment>
    )
 }
@withRouter
@connect(state=>state,{
})
class Search extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         value: ''
    //     }
    // }
    // componentDidMount() {
    //     // this.manualFocusInst.focus();
    //     if (!this.props.listData || !this.props.listData.productList || this.props.listData.productList.length == 0) {
    //         this.props.getCategoriesAndProduct();
    //     }
    // }

    render(){
        const productList = (this.props.listData && this.props.listData.productList) ? this.props.listData.productList : [];
        const inputtedValue = this.props.listData.searchInputtedValue;
        const filteredProductList = productList.filter(item => { 
            return (item.title && item.title.toLowerCase().includes(inputtedValue)) ? item : null
        });
        return (
            <div className="search-page">
                <FocusWindow/>
                <NavBar
                    mode="light"  
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.replace('/home')}
                    rightContent={[
                    ]}
                    className="navbar-search"
                    title={""}
                    >
                        {/* <SearchBar
                            value={this.state.value}
                            placeholder="Type your keyword to find"
                            // onSubmit={value => console.log(value, 'onSubmit')}
                            // onClear={value => console.log(value, 'onClear')}
                            // onFocus={() => console.log('onFocus')}
                            // onBlur={() => console.log('onBlur')}
                            // onCancel={() => console.log('onCancel')}
                            showCancelButton={false}
                            onChange={this.onChange}
                            ref={ref => this.manualFocusInst = ref}
                            cancelText={<IoIosCloseCircleOutline key="cancel" className="cancel-search-icon"/>}
                        /> */}
                        <FocusInputSearchBar productList={this.props.listData.productList}/>
                </NavBar>
                <ProductList productListData={filteredProductList} searchMode/>
            </div>
        )
    }
}

export default Search