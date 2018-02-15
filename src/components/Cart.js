import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//COMPONENTS
import Nav from './shop-components/ShopNav';
import ProductRow from './cart-components/ProductRow';

class Cart extends Component {
    constructor(){
        super();
        this.formatPrice = this.formatPrice.bind(this);
    }
    formatPrice(price){
        return `$${price / 100}`;
    }
    getTotal(items){
        var total = items.reduce(function(price, item){
            return price + item.item.price * item.qty;
        }, 0);

        return this.formatPrice(total);
    }
    render(){
        return (
            <div className="cart-page">
                <Nav/>
                <div className="cart">
                    <h1>Cart</h1>
                    {this.props.cart.totalItems > 0 &&
                        <div className="purchases">
                            <div className="row header">
                                <div className="col">
                                    Product
                                </div>
                                <div className="col">
                                    Price
                                </div>
                                <div className="col">
                                    Quantity
                                </div>
                                <div className="col">
                                    {/* placeholder for remove from cart button */}
                                </div>
                            </div>
                            {this.props.cart.items.map(product=>{
                                return <ProductRow formatPrice={this.formatPrice} key={product.item._id} product={product}/>;
                            })}
                            
                        </div>
                    }

                    {this.props.cart.totalItems < 1 &&
                        <p>Your cart is empty</p>
                    }
                    
                    {this.props.cart.totalItems > 0 &&
                        <div>
                            <div className="total">Your Total: {this.getTotal(this.props.cart.items)}</div> 
                            <Link to="/checkout">
                                <button className="checkout-btn">Checkout</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{ 
    return {
        cart: state.cart
    }
};


export default connect(mapStateToProps)(Cart);