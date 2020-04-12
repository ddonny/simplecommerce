import axios from "axios";
import {Toast} from "antd-mobile";

axios.interceptors.request.use(function (res){
    Toast.loading("Please Wait...",0);
    return res;
})

axios.interceptors.response.use(function (req){
    Toast.hide();
    return req.data;
})
