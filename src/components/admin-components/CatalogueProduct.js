import React, {Component} from 'react';
import Catalogue from './Catalogue';
import {Link} from 'react-router-dom';

class CatalogueProduct extends Component {
    render(){
        return (
            <div className="product">
                <p>{this.props.product._id}</p>
                <p>{this.props.product.name}</p>
                <Link to={"./products/" + this.props.product._id}><button className="edit-btn">Edit</button></Link>
                <button onClick={() => this.props.showModal(this.props.product)} className="remove-btn">Remove</button>
            </div>
        );
    }
}

export default CatalogueProduct;