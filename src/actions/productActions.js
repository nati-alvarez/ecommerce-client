import axios from 'axios';
import {API_BASE_URL} from '../config';

exports.getProducts = ()=>{
    return function(dispatch){
        axios.get(`${API_BASE_URL}/products`).then(res=>{
            if(res.data.success === true){
                dispatch({type: "GET_PRODUCTS_SUCCESS", payload: res.data.products});
            }
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.getProduct = (id)=>{
    return function(dispatch){
        axios.get(`${API_BASE_URL}/products/${id}`).then(res=>{
            if(res.data.success === true){
                dispatch({type: "GET_PRODUCT_SUCCESS", payload: res.data.product});
            }
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.createProduct = (body)=>{
    return function(dispatch){
        dispatch({type: "CREATE_PRODUCT_START"});

        axios.post(`${API_BASE_URL}/products`, body, {headers: {Authorization: `bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type: "CREATE_PRODUCT_SUCCESS", payload: "Product added to catalogue!"});
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }
}

//clears prop that notifies user of successful form submissons
exports.clearNewProductData = ()=>{
    return function(dispatch){
        dispatch({type: "CLEAR_CREATE_DATA"});
    }
}

exports.updateProduct = (productId, body)=>{
    return function (dispatch){
        dispatch({type: "UPDATE_START"});
        axios.put(`${API_BASE_URL}/products/${productId}`, body, {headers: {Authorization: `bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type: "UPDATE_SUCCESS", payload: "Product info updated!"});
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.clearUpdateData = ()=>{
    return function(dispatch){
        dispatch({type:"CLEAR_UPDATE_DATA"});
    }
}

exports.deleteProduct = (productId)=>{
    return function(dispatch){
        axios.delete(`${API_BASE_URL}/products/${productId}`, {headers: {Authorization: `bearer ${localStorage.getItem('token')}`}}).then(res=>{
            dispatch({type: "DELETE_PRODUCT", payload: res.data.productId});
        }).catch(error=>{
            console.log(error.response);
        });
    }
}

exports.clearProductData = ()=> {
    return function(dispatch){
        dispatch({type: "CLEAR_PRODUCT_DATA"});
    }
}