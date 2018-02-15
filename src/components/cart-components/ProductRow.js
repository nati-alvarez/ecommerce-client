import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {updateQuantity} from '../../actions/cartActions';
import {removeFromCart} from '../../actions/cartActions';

class ProductRow extends Component {
    render(){
        return (
            <div className="row">
                <div className="col">
                    {this.props.product.item.name}
                </div>
                <div className="col">
                    {this.props.formatPrice(this.props.product.item.price)}
                </div>
                <div className="col">
                    <input onChange={(e) => (this.props.updateQuantity(e))} data-product={this.props.product.item._id} type="number" max={this.props.product.item.stock} min="1" defaultValue={this.props.product.qty}/>
                </div>
                <div className="col">
                    <button onClick={(e) => (this.props.removeFromCart(e))}data-product={this.props.product.item._id} className="remove-from-cart">Remove</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        updateQuantity: (e)=> dispatch(updateQuantity(e.target.dataset.product, e.target.value)),
        removeFromCart: (e)=> dispatch(removeFromCart(e.target.dataset.product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow);