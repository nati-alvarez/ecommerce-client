import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//COMPONENTS
import Nav from './shop-components/ShopNav';
import Form from './checkout-components/Form';
import OrderSummary from './checkout-components/OrderSummary';

//ACTIONS

class Checkout extends Component {

    render(){
        return (
            <main className="checkout-page">
                <Nav/>
                <div className="checkout">
                    <div className="checkout-form">
                        <h1>Checkout</h1>
                        <Form cart={this.props.cart}/>
                        {this.props.cart.startCheckout &&
                            <p>...loading</p>
                        }
                        {
                            this.props.cart.checkoutError &&
                            <p className="checkout-error">{this.props.cart.checkoutError}</p>
                        }
                        {this.props.cart.orderId && 
                            <Redirect to={`/checkout-success/${this.props.cart.orderId}`}/>
                        }
                    </div>
                    <OrderSummary cart={this.props.cart}/>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Checkout);