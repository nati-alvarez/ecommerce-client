import axios from 'axios';
import {API_BASE_URL} from '../config';

exports.adminLogin = (body)=>{
    return function(dispatch){
        dispatch({type: "ADMIN_LOGIN_START"});
        axios.post(`${API_BASE_URL}/auth/admin/login`, body).then(res=>{
            console.log(res);
            if(res.data.success === true){
                dispatch({type: "ADMIN_LOGIN_SUCCESS", payload: {user: res.data.user, token: res.data.token}})
            }
        }).catch(err=>{
            dispatch({type: "ADMIN_LOGIN_ERROR", payload: err.response.data.message});
        })
    }
}

exports.adminLogout = ()=>{
    return function(dispatch){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({type: "ADMIN_LOGOUT"});
    }
}