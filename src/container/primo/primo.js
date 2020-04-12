import React,{Component} from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import { NavBar, SearchBar } from "antd-mobile";
import {updateInfo} from "../../redux/user.redux";
import {getCategoriesAndProduct} from "../../redux/list.redux";
import { AiOutlineHeart } from 'react-icons/ai';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import CategoriesList from '../../components/categories-list/categories-list';
import ProductList from '../../components/product-list/product-list';
import './primo.scss'
@withRouter
@connect(state=>state,{
    updateInfo,
    getCategoriesAndProduct
})
class Primo extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: '',
        };
    }
    componentDidMount() {
        if (this.props.listData.productList.length === 0) {
            this.props.getCategoriesAndProduct();
        }
    }

    render(){
        return (
            <div className="primo-page">
                <NavBar
                    mode="light"  
                    icon={<AiOutlineHeart key="fav" className="navbar-favourite-icon"/>}
                    // onLeftClick={() => console.log('fav')}
                    rightContent={[
                    ]}
                    className="navbar-primo"
                    title={""}
                    >
                        <SearchBar
                            placeholder="Find your stuff by tap here"
                            // onSubmit={value => console.log(value, 'onSubmit')}
                            // onClear={value => console.log(value, 'onClear')}
                            onFocus={() => this.props.history.push("/search")}
                            // onBlur={() => console.log('onBlur')}
                            // onCancel={() => console.log('onCancel')}
                            showCancelButton={false}
                            // onChange={this.onChange}
                            ref={ref => this.manualFocusInst = ref}
                            cancelText={<IoIosCloseCircleOutline key="cancel" className="cancel-search-icon"/>}
                        />
                </NavBar>
                <CategoriesList categoriesListData={this.props.listData.categoriesList}/>
                <ProductList productListData={this.props.listData.productList}/>
            </div>
        )
    }
}

export default Primo