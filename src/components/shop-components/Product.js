import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Product extends Component {
    formatPrice(rawPrice){
        return "$" + parseFloat(rawPrice / 100);
    }
    stockCount(stock){
        if (stock > 0){
            return <p className='stock'>in stock:  {stock}</p>;
        }
        return <p className='stock out'>out of stock</p>;
    }
    render(){
        return (
            <div className="product">
                <Link to={"/product/" + this.props.product._id}>
                    <div className="image-container">
                        <img src={this.props.product.imagePath}/>
                    </div>
                </Link>
                <Link to={"/product/" + this.props.product._id}>
                    <p className="product-name">{this.props.product.name}</p>
                </Link>
                <p className="price">{this.formatPrice(this.props.product.price)}</p>
                {this.stockCount(this.props.product.stock)}
            </div>
        )
    }
}

export default Product;