import React, {Component} from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import Product from './Product';

//ACTIONS
import {getProducts as getProductsAction} from '../../actions/productActions';

class Products extends Component {
    componentWillMount(){
        this.props.getProducts();
    }
    render(){
        var products = [];
        if(this.props.products != null){
            this.props.products.map((product)=>{
                var item = <Product key={product._id} product={product}/>
                products.push(item);
            });
        }else {
            products = "loading catalogue please wait...";
        }

        return(
            <div className="products-catalogue">
                <h1>Our Catalougue</h1>
                <div className="products">
                    {products}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getProducts: ()=> dispatch(getProductsAction())
    }
}

const mapStateToProps = (state) =>{
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);