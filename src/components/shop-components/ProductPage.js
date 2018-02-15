import React, {Component} from 'react';
import {connect} from 'react-redux'

//COMPONENTS
import Nav from './ShopNav';

//ACTIONS
import {getProduct} from '../../actions/productActions';
import {addToCart} from '../../actions/cartActions';

class ProductPage extends Component {
    componentDidUpdate(){
        if(this.props.notificationText !== null){
            setTimeout(this.props.clearNotificationText, 5000);
        }
    }
    componentWillMount(){
        this.props.clearNotificationText();
        this.props.getProduct(this.props.match.params.id);
    }
    componentWillUnmount(){
        this.props.clearNotificationText();
    }
    formatPrice(price){
        return `$${parseFloat(price / 100)}`;
    }
    render(){
        console.log(this.props);
        if(this.props.product === null){
            return (
                <h1>404 Product Not Found</h1>
            )
        }
        return (
            <main>
                <Nav/>
                <div className="product-page">
                    <div className="product">
                        <div className="product-image">
                            <img src={this.props.product.imagePath}/>
                        </div>
                        <div className="product-info">
                            <h1>{this.props.product.name}</h1>
                            <p className="description">{this.props.product.description}</p>
                            <p className="price">{this.formatPrice(this.props.product.price)}</p>
                            
                            {this.props.product.stock < 1 &&
                                <div className="out-of-stock">
                                    <p className="out">OUT OF STOCK</p>
                                    <small>We are sorry, but this item is temporarily out of stock. Check back at a later date.</small>
                                </div>
                            }
                            {this.props.product.stock > 0 &&
                                <div>
                                    <div className="qty">
                                        qty: <input id="qty" min="1" max={this.props.product.stock} defaultValue="1" type="number"/>
                                    </div>
                                    <button onClick={() => this.props.addToCart(this.props.product._id)}className="add-to-cart">Add To Cart</button> 
                                    <span className="stock">in stock: {this.props.product.stock}</span> 
                                </div>  
                            }

                            {/* notification modal for succesful addToCart */}
                            {this.props.notificationText &&
                                <div id="notification">
                                    {this.props.notificationText}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.products.product,
        notificationText: state.cart.notificationText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProduct: (id) => dispatch(getProduct(id)),
        addToCart: (productId) => dispatch(addToCart(productId, document.getElementById('qty').value)),
        clearNotificationText: () => dispatch({type:"CLEAR_NOTIFICATION"}) //clear notification message after 5 seconds
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);