import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {createProduct, clearNewProductData} from '../../actions/productActions';

class NewProduct extends Component {
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
        //disable button to prevent accidental re-submission
        e.target.disabled = true;

        this.props.createProduct(this.state.input);
    }
    componentDidUpdate(){
        if(this.props.newProduct.loading === false){
            var createProductBtn = document.getElementById("create-product-btn");
            createProductBtn.disabled = false;
        }
        if(this.props.newProduct.successMessage){
            setTimeout(this.props.clearNewProductData, 5000)
        }
    }
    render(){
        console.log(this.props);
        return (
            <div className="new-product-page content">
                <h1>Make A New Product</h1>
                <div className="new-product-form">
                    <div className="field">
                        <div className="input">
                            Product Image: <input onChange={(e)=> this.updateInput(e, 'imagePath')} type="text"/>
                            <small>Enter image url</small>
                        </div>
                        <img src={this.state.input.imagePath} width="230" height="320" alt="product image here"/>
                        
                    </div>
                    <div className="field">
                        <div className="input">
                            Product Name: <input onChange={(e)=> this.updateInput(e, 'name')} type="text"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="input">
                            Product Sku: <input onChange={(e)=> this.updateInput(e, 'sku')} maxLength="8" type="text"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="input">
                            Product Description:
                            <textarea onChange={(e)=> this.updateInput(e, 'description')}></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <div className="input">
                            Price: <input onChange={(e)=> this.updateInput(e, 'price')} type="number"/>
                            <small>Enter the price without decimal places</small>
                        </div>
                    </div>
                    <div className="field">
                        <div className="input">
                            Stock: <input onChange={(e)=> this.updateInput(e, 'stock')} type="number"/>
                        </div>
                    </div>
                    <button id="create-product-btn" onClick={(e) => this.submitForm(e)} className="create-product-btn">Create Product</button>
                    {this.props.newProduct.loading &&
                        <p className="loading">loading...</p>
                    }
                    {this.props.newProduct.successMessage &&
                        <p className="success-message">{this.props.newProduct.successMessage}</p>
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        createProduct: (body) => dispatch(createProduct(body)),
        clearNewProductData: ()=> dispatch(clearNewProductData())
    }
}

const mapStateToProps = (state)=>{
    return {
        newProduct: state.admin.createProduct
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);