import React, {Component} from 'react';

class OrderSummary extends Component {
    render(){
        var purchases = this.props.cart.items.map(product=>{
            return (
                <div key={product.item._id} className="row">
                    <div>{product.item.name}</div>
                    <div>x{product.qty}</div>
                    <div>${product.item.price/100}</div>
                </div>
            )
        });
        return(
            <div className="order-summary">
                <h1>Your Order</h1>

                <div className="purchases">
                    <div className="head">
                        <div>Product</div>
                        <div>Qty</div>
                        <div>Price</div>
                    </div>
                    {purchases}
                </div>

                <div className="total">
                    Your Total: ${this.props.cart.totalPrice/100}
                </div>

            </div>
        )
    }
}

export default OrderSummary;