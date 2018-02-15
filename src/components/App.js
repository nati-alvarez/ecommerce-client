import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

//COMPONENTS
import ShopHome from './ShopHome';
import ProductPage from './shop-components/ProductPage'
import Cart from './Cart';
import Checkout from './Checkout';
import CheckoutSuccess from './CheckoutSuccess';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';

class App extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ShopHome}/>
                    <Route path="/product/:id" component={ProductPage}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/checkout-success/:orderId" component={CheckoutSuccess}/>
                    <Route exact path="/admin" component={AdminLogin}/>
                    <Route path="/admin/:section" component={AdminPanel}/>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(App);

