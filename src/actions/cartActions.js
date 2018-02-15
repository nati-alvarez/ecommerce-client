import axios from 'axios';
import {API_BASE_URL} from '../config';

exports.addToCart = (productId, qty) =>{
    return (dispatch)=>{
        axios.get(`${API_BASE_URL}/products/${productId}`).then(res=>{
            dispatch({type: "ADD_TO_CART", payload: {product: res.data.product, qty: parseInt(qty)}});
        }).catch(err=>{
            console.log(err);
        });
    }
}

exports.updateQuantity = (productId, qty) =>{
    return (dispatch)=>{
        dispatch({type: "UPDATE_QUANTITY", payload: {productId, qty}});
    }
}

exports.removeFromCart = (productId) =>{
    return (dispatch) => {
        dispatch({type: "REMOVE_FROM_CART", payload: {productId}});
    }
}

exports.checkout = (formData) =>{
    return (dispatch)=>{
        dispatch({type: "CHECKOUT_START"});
        axios.post(`${API_BASE_URL}/cart/checkout`, {formData}).then(res=>{
            if(res.data.success === true){
                localStorage.removeItem("cart");
                dispatch({type: "CHECKOUT_SUCCESS", payload: res.data.order});
            }
        }).catch(error=>{
            console.log(error);
            dispatch({type: "CHECKOUT_ERROR", payload: "An error occurred. Please try again."});
        });
    }
}

exports.clearOrderData = () =>{
    return (dispatch)=>{
        dispatch({type:"CLEAR_ORDER_DATA"});
    }
}