import React, {Component} from 'react';
import {connect} from 'react-redux';

// COMPONENTS
import Header from './shop-components/Header';
import Nav from './shop-components/ShopNav';
import Products from './shop-components/Products';
import ProductPage from './shop-components/ProductPage';

class ShopHome extends Component {
    render(){
        return(
            <div className="shop-home">
                <Nav/>
                <Products/>
            </div>
        )
    }
}

const mapStateToProps = (store)=> {
    return {
        auth: store.auth
    }
};

export default connect(mapStateToProps)(ShopHome);