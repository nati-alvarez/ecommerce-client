import React, {Component} from 'react';

class DeleteProduct extends Component {
    render(){
        return (
            <div className="delete-modal">
                <span onClick={this.props.hideModal} className="close-modal"> &times; </span>
                <h1>Are You Sure?</h1>
                <p>This product will be permanently deleted from the catalogue:</p>
                <div className="product-deleted">
                    <div className="container">
                        <img src={this.props.product.imagePath} width="160" height="240"/>
                        <div className="product-info">
                            <p>Product Name: {this.props.product.name}</p>
                            <p>Sku: {this.props.product.sku}</p>
                            <p>Id: {this.props.product._id}</p>
                        </div>
                    </div>
                    <button onClick={() => this.props.deleteProduct(this.props.product._id)}className="delete-btn">Yes, Delete This Product</button>
                </div>
            </div>
        )
    }
}

export default DeleteProduct;