import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {getProduct, updateProduct, clearProductData, clearUpdateData} from '../../actions/productActions';

//COMPONENTS
import Nav from './Nav';

class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: {
                sku: null,
                name: null,
                imagePath: null,
                description: null,
                price: null,
                stock: null
            }
        }
        this.submitForm = this.submitForm.bind(this);
    }
    componentWillMount(){
        this.props.getProduct(this.props.productId);
    }
    componentWillUnmount(){
        this.props.clearProductData();
    }
    updateInput(e, field){
        switch(field){
            case "imagePath":
                this.setState({input: Object.assign({}, this.state.input, {imagePath: e.target.value})});
                break;
            case "name":
                this.setState({input: Object.assign({}, this.state.input, {name: e.target.value})});
                break;
            case "sku":
                this.setState({input: Object.assign({}, this.state.input, {sku: e.target.value})});
                break;
            case "description":
                this.setState({input: Object.assign({}, this.state.input, {description: e.target.value})});
                break;
            case "price":
                this.setState({input: Object.assign({}, this.state.input, {price: Number(e.target.value)})});
                break;
            case "stock":
                this.setState({input: Object.assign({}, this.state.input, {stock: e.target.value})});
        }
    }
    submitForm(e){
        e.target.disabled = true;
        this.props.updateProduct(this.props.product._id, this.state.input);
    }
    componentDidUpdate(){
        //re-enable button after update is completed
        if(this.props.editProduct.loading === false){
            var editBtn = document.getElementById("edit-btn");
            editBtn.disabled = false;
        }

        //clear success notification after it is seen
        if(this.props.editProduct.successMessage) setTimeout(this.props.clearUpdateData, 5000);
    }
    render(){
        return (
            <main className="edit-product-page content">
                <div>
                    <h1>Edit Product Details</h1>
                    {this.props.product &&
                        <div className="edit-form">
                            <div className="field">
                                <div className="input">
                                    Product Image: <input onChange={(e)=> this.updateInput(e, "imagePath")} defaultValue={this.props.product.imagePath}/>
                                    <small>Enter image url</small>
                                </div>
                                <img src={this.state.input.imagePath || this.props.product.imagePath} width="230" height="320"/>
                            </div>
                            <div className="field">
                                <div className="input">
                                    Product Name: <input onChange={(e)=> this.updateInput(e, "name")} defaultValue={this.props.product.name}/> 
                                </div>
                            </div>
                            <div className="field">
                                <div className="input">
                                    Product Sku: <input onChange={(e)=> this.updateInput(e, "sku")} defaultValue={this.props.product.sku}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="input">
                                    Product Description: 
                                    <textarea onChange={(e)=> this.updateInput(e, "description")} defaultValue={this.props.product.description}></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <div className="input">
                                    Price: <input onChange={(e)=> this.updateInput(e, "price")} type="number" defaultValue={this.props.product.price}/>
                                    <small>Enter the price without decimal places.</small>
                                </div>
                            </div>
                            <div className="field">
                                <div className="input">
                                    Stock: <input onChange={(e)=> this.updateInput(e, "stock")} type="number" defaultValue={this.props.product.stock}/>
                                </div>
                            </div>
                            <button id="edit-btn" onClick={(e) => this.submitForm(e)} className="edit-btn">Submit Changes</button>
                            {this.props.editProduct.loading &&
                                <p className="loading">Loading...</p>
                            }
                            {this.props.editProduct.successMessage &&
                                <p className="success-message">{this.props.editProduct.successMessage}</p>
                            }
                        </div>
                    }
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        product: state.admin.product,
        editProduct: state.admin.editProduct
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getProduct: (productId) => dispatch(getProduct(productId)),
        updateProduct: (productId, body) => dispatch(updateProduct(productId, body)),
        clearProductData: () => dispatch(clearProductData()),
        clearUpdateData: () => dispatch(clearUpdateData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);