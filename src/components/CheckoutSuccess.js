import React, {Component} from 'react';

//COMPONENTS
import Nav from './shop-components/ShopNav';

//ACTIONS
import {clearOrderData} from '../actions/cartActions';

class CheckoutSuccess extends Component {
    componentDidMount(){
        clearOrderData();
    }
    render(){
        return (
            <div>
                <Nav/>
                <main className="checkout-success-page">
                    <h1>Your Order Was Placed Successfully!</h1>
                    <h3>Your order tracking id is: {this.props.match.params.orderId}</h3>
                    <p>Thank you for shopping at Gamer's Gulf! Please check your email for confirmation and an order tracking link.</p>
                </main>
            </div>
        );
    }
}

export default CheckoutSuccess;