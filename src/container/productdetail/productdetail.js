import React,{Component} from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import { Button,WingBlank,Flex } from "antd-mobile";
import {IoIosHeartEmpty, IoIosHeart, IoMdArrowBack} from 'react-icons/io';
import {FiShare2} from 'react-icons/fi';
import {setFavProduct, setBuyProduct} from "./../../redux/list.redux";
import './productdetail.scss';
import _ from 'lodash';
import Popover from 'react-tiny-popover'
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LineShareButton,
    LineIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import FocusWindow from '../../components/focuswindow/focuswindow'
@withRouter
@connect(state=>state,{
    setFavProduct,
    setBuyProduct
})
class Productdetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            item : this.props.listData.productDetail,
            shareUrl: 'https://elated-archimedes-0cbc50.netlify.com',
            title: 'Simple Commerce',
            isPopoverOpen: false
        }
    }
    componentDidMount() {
        if (!this.state.item.imageUrl) {
            this.props.history.replace('/home')
        }
    }
    doSetFavProduct(item) {
        this.props.setFavProduct(item.id)
        let newItem ={
            ...item,
            loved: 1
        }
        this.setState({item: newItem});
    }
    doBuyProduct(item) {
        this.props.setBuyProduct(item);
    }

    showShareButton(item) {
        this.setState({isPopoverOpen: !this.state.isPopoverOpen})
    }

    render(){
        const {item, shareUrl, title, isPopoverOpen} = this.state;
        const purchaseList = this.props.listData.purchaseList;
        let found = _.find(purchaseList, function(pl){ return pl.id ===  item.id });
        return (
            <WingBlank className="productdetail-page">
                <FocusWindow/>
               <Flex className="productdetail-image">
                    <Flex.Item>
                        <div className="image-wrapper">
                            <IoMdArrowBack className="back-button" onClick={() => this.props.history.goBack()}/>
                            <Popover
                                isOpen={isPopoverOpen}
                                position={'top'} // preferred position
                                content={(
                                <div>
                                    <Flex>
                                        <Flex.Item>
                                            <EmailShareButton url={shareUrl}>
                                                <EmailIcon size={32} round />
                                            </EmailShareButton>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <FacebookShareButton url={shareUrl} quote={title}>
                                                <FacebookIcon size={32} round />
                                            </FacebookShareButton>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <LineShareButton url={shareUrl} quote={title}>
                                                <LineIcon size={32} round />
                                            </LineShareButton>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex>
                                        <Flex.Item>
                                            <WhatsappShareButton url={shareUrl} quote={title}>
                                                <WhatsappIcon size={32} round />
                                            </WhatsappShareButton>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <TelegramShareButton url={shareUrl} quote={title}>
                                                <TelegramIcon size={32} round />
                                            </TelegramShareButton>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <TwitterShareButton url={shareUrl} quote={title}>
                                                <TwitterIcon size={32} round />
                                            </TwitterShareButton>
                                        </Flex.Item>
                                    </Flex>
                                </div>
                            )}>
                                <FiShare2 className="share-button" onClick={() => this.showShareButton()}/>
                            </Popover>
                            <img
                                src={`${item.imageUrl}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                }}
                            />
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="productdetail-title">{item.title}</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="fav-action-wrapper" onClick={() => this.doSetFavProduct(item)}>
                            {
                                (item.loved) ?
                                <IoIosHeart color="#98002E" className="fav-action-icon"/>
                                :
                                <IoIosHeartEmpty className="fav-action-icon"/>
                            }                                        
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <div className="productdetail-desc">{item.description}</div>
                    </Flex.Item>
                </Flex>
                <Flex className="foot-info">
                    <Flex.Item>
                        <div className="price-tag">
                            {item.price}
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <Button disabled={(found) ? true : false} className="buy-button" size="small" onClick={() => this.doBuyProduct(item)}>Buy</Button>
                    </Flex.Item>
                </Flex>
            </WingBlank>
        )
    }
}

export default Productdetail