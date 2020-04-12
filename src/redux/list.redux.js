import axios from "axios";
import { Toast } from "antd-mobile";
import _ from 'lodash';

const CATEGORIES_PRODUCT_LIST_SUCCESS = "CATEGORIES_PRODUCT_LIST_SUCCESS"
const PRODUCT_LIST_UPDATE = "PRODUCT_LIST_UPDATE"
const PURCHASE_LIST_UPDATE = "PURCHASE_LIST_UPDATE"
const PRODUCT_DETAIL_DATA = "PRODUCT_DETAIL_DATA"
const UPDATE_SEARCH_INPUT_VALUE = "UPDATE_SEARCH_INPUT_VALUE"
const initState = {
    purchaseList:[],
    categoriesList: [],
    productList: [],
    productDetail: {},
    searchInputtedValue: ""
}

//reducer
export function listData(state=initState,action){
    switch(action.type){
        case CATEGORIES_PRODUCT_LIST_SUCCESS:
            // var newProductList = _.map(action.data.productPromo, function(element) { 
            //     return _.extend({}, element, {favourite: false});
            // });
            return {
                ...state,
                categoriesList: (action.data.category) ? action.data.category : [],
                // productList: newProductList
                productList: (action.data.productPromo) ? action.data.productPromo : [],
            }
        case PRODUCT_LIST_UPDATE:
            return {
                ...state,
                productList: action.newProductList
            }
        case PURCHASE_LIST_UPDATE:
            return {
                ...state,
                purchaseList: [...state.purchaseList, action.newPurchaseItem]
            }
        case PRODUCT_DETAIL_DATA:
            return {
                ...state,
                productDetail: action.data
            }
        case UPDATE_SEARCH_INPUT_VALUE:
            return {
                ...state,
                searchInputtedValue: action.data
            }
        default:
            return state;
    }
}

//action

export function setFavProduct(dataId) {
    return (dispatch, getState) => {
        let listDataReducer = getState().listData;
        let productList = _.cloneDeep(listDataReducer.productList);
        var newProductList = _.map(productList, function(element) {
            if (element.id === dataId) {
                return {...element, loved: 1};
            }
            return element;
        });
        dispatch({
            newProductList,
            type:PRODUCT_LIST_UPDATE
        })
    }
}
export function setSearchInputtedValue(data) {
    return {
        data,
        type: UPDATE_SEARCH_INPUT_VALUE
    }
}
export function setDetailProductData(data) {
    return {
        data,
        type: PRODUCT_DETAIL_DATA
    }
}
export function setProductList(data) {
    return {
        data,
        type:PRODUCT_LIST_UPDATE
    }
}
export function setBuyProduct(newPurchaseItem) {
    return (dispatch, getState) => {
        let listDataReducer = getState().listData;
        let purchaseList = _.cloneDeep(listDataReducer.purchaseList);
        let found = _.find(purchaseList, function(item){ 
            if (item.id ===  newPurchaseItem.id) {
                return item;
            } 
        });
        if (found) {
            Toast.fail("You already bought this before")
        } else {
            Toast.success("Bought Successfully", 2, ()=>{
                dispatch({
                    newPurchaseItem,
                    type:PURCHASE_LIST_UPDATE
                })
            })
        }
    }
}
export function categoriesAndProductList(data){
    return {
        data,
        type:CATEGORIES_PRODUCT_LIST_SUCCESS
    }
}

export function getCategoriesAndProduct() {
    return dispatch=>{
        axios.get("https://private-4639ce-ecommerce56.apiary-mock.com/home").then(res=>{
            if (res && res.length > 0 && res[0].data) {
                dispatch(categoriesAndProductList(res[0].data))
            } else {
                Toast.fail("Fail to fetch categories and product")
            }
        }).catch(err=>{
            Toast.fail("Fail to fetch categories and product")
        })
    }
}

// export function actionUserList(type){
//     return dispatch=>{
//         axios.post("/user/list",{type}).then(res=>{
//             if(res.code===1){
//                 dispatch(userList(res.data))
//             }else{
//                 Toast.fail(res.msg)
//             }
//         }).catch(err=>{
//             Toast.fail("Failed to get user data")
//         })
//     }
// }