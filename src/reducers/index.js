import {combineReducers} from 'redux';

import auth from './authReducer';
import cart from './cartReducer';
import products from './productsReducer';
import admin from './adminReducer';

export default combineReducers({
    admin,
    auth,
    cart,
    products
});