import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//ACTIONS
import {getProducts, deleteProduct} from '../../actions/productActions';

//COMPONENTS
import CatalogueProduct from './CatalogueProduct';
import DeleteProduct from './DeleteProduct';


class Catalogue extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            productToDelete: null
        };
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    componentDidMount(){
        this.props.getAllProducts();
    }
    showDeleteModal(product){
        this.setState({productToDelete: product, showModal: true});
    }
    hideDeleteModal(){
        this.setState({productToDelete: null, showModal: false});
    }
    deleteProduct(productId){
        this.props.deleteProduct(productId);
        this.setState({showModal: false})
    }
    render(){
        if(this.props.products){
            var products = this.props.products.map(product=>{
                return <CatalogueProduct showModal={this.showDeleteModal} key={product._id} product={product}/>;
            });
        }
        return (
            <section className="admin-content catalogue">
                <h1>Catalogue</h1>
                <div className="catalogue-actions">
                    <Link to={"/admin/products/new"}>
                        <button className="add-new-product">Add New Product</button>
                    </Link>
                </div>
                <div className="catalogue-products">
                    <div className="catalogue-header">
                        <div>Product Id</div>
                        <div>Product Name</div>
                        <div></div>
                        <div></div>
                    </div>
                    {this.props.products &&
                        products
                    }
                    {this.state.showModal &&
                        <DeleteProduct deleteProduct={this.deleteProduct} hideModal={this.hideDeleteModal} product={this.state.productToDelete}/>
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getAllProducts: () => dispatch(getProducts()),
        deleteProduct: (productId) => dispatch(deleteProduct(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);