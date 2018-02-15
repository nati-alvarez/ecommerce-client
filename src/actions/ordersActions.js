import axios from 'axios';
import {API_BASE_URL} from '../config';

exports.getCatalogue = ()=>{
    return function(dispatch){
        axios.get(`${API_BASE_URL}/orders`).then(res=>{
            if(res.data.success === true){
                dispatch({type:"GET_ORDERS", payload: res.data.orders})
            }
        }).catch(error=>{
            console.log(error);
        })
    }
}