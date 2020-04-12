import React from "react";
import { Flex, WingBlank } from 'antd-mobile';
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";
import './product-list.scss'
import {IoIosHeartEmpty, IoIosHeart} from 'react-icons/io';
import {setFavProduct, setDetailProductData} from "../../redux/list.redux";
@withRouter
@connect(state=>state.user,{
    setFavProduct,
    setDetailProductData
})
class ProductList extends React.Component{
    static propTypes = {
        productListData: PropTypes.array
    }
    showDetailProduct(val) {
        this.props.setDetailProductData(val);
        this.props.history.push('/productdetail');
    }
    render(){
        const data = this.props.productListData ? this.props.productListData : [];
        const {searchMode, purchaseListMode} = this.props;
        return (
            <div className="product-list">
                {
                    (data && data.length > 0 && (searchMode || purchaseListMode)) ?
                    <WingBlank>
                        {data.map((val, index) => (
                            <Flex key={index} className="product searchmode" onClick={() => this.showDetailProduct(val)}>
                                <Flex.Item>
                                    <img
                                        src={`${val.imageUrl}`}
                                        alt=""
                                        style={{ width: '100px', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                        }}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                    <div className="item-desc">{`${val.title}`}</div>
                                    <div className="item-price">{`${val.price}`}</div>
                                </Flex.Item>
                            </Flex>
                        ))}
                    </WingBlank>
                    :
                    (data && data.length > 0) ?
                    <WingBlank>
                        {data.map((val, index) => (
                            <div key={index} className="product">
                                <img
                                    src={`${val.imageUrl}`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                    }}
                                    onClick={() => this.showDetailProduct(val)}
                                />
                                    <div className="fav-action-wrapper" onClick={() => {this.props.setFavProduct(val.id)}}>
                                        {
                                            (val.loved) ?
                                            <IoIosHeart color="#98002E" className="fav-action-icon"/>
                                            :
                                            <IoIosHeartEmpty className="fav-action-icon"/>
                                        }                                        
                                    </div>
                                    <div className="item-desc">{`${val.title}`}</div>
                            </div>
                        ))}
                    </WingBlank>
                    :
                    (searchMode)?
                        <div className="message-to-user">
                            No Results. Try broaden your keywords.
                        </div>
                    :
                    (purchaseListMode)?
                        <div className="message-to-user">
                            Hmm, Try throw something to your basket.
                        </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default ProductList