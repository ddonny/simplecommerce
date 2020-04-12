import React from "react";
import { WingBlank, Carousel } from 'antd-mobile';
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";
import './categories-list.scss'
@withRouter
@connect(state=>state.user)
class CategoriesList extends React.Component{
    static propTypes = {
        categoriesListData: PropTypes.array
    }
    constructor(props){
        super(props)
        this.state = {
            value: '',
            imgHeight: 40
        };
        this.carouselRef = React.createRef()
    }

    clickHandle(v){
        // this.props.history.push(`/chat/${v._id}/${v.username}`)
    }

    render(){
        const data = this.props.categoriesListData ? this.props.categoriesListData : [];
        return (
            <div>
                {
                    (data && data.length > 0) ?
                    <WingBlank className="categories-list-wb">
                        <Carousel className="categories-list freeze"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={"50px"}
                        autoplay={false}
                        infinite={false}
                        dots={false}
                        ref={this.carouselRef}
                        >
                        {data.map((val, index) => (
                            <a
                            key={val}
                            href="/#"
                            style={{
                                display: 'block',
                                position: 'relative',
                                // top: this.state.slideIndex === index ? -10 : 0,
                                height: this.state.imgHeight
                            }}
                            >
                            <img
                                className="category-image"
                                src={`${val.imageUrl}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                    setTimeout(() => {
                                        document.querySelector('.slider.categories-list').classList.remove('freeze')
                                        document.querySelector('.slider.categories-list').style.transform = "translate3d(-120px, 0px, 0px)"
                                    }, 0);
                                }}
                            />
                                <span className="item-desc">{`${val.name}`}</span>
                            </a>
                        ))}
                        </Carousel>
                    </WingBlank>
                    :
                    // <div className="loading-inline-center">
                    //     <ActivityIndicator
                    //         text="Fetching Categories..."
                    //     />
                    // </div>
                    null
                }
            </div>
        )
    }
}

export default CategoriesList