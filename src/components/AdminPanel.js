import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS   
import {adminLogout} from '../actions/adminActions';

//COMPONENTS
import Nav from './admin-components/Nav';
import Orders from './admin-components/Orders';
import Catalogue from './admin-components/Catalogue';
import EditProduct from './admin-components/EditProduct';
import NewProduct from './admin-components/NewProduct';

class AdminPanel extends Component {
    componentDidMount(){
        if(!this.props.user){
            this.props.history.push("/");
        }else if(this.props.user.isAdmin === false){
            this.props.history.push("/");
        }
    }
    componentDidUpdate(){
        if(!this.props.user){
            this.props.history.push("/");
        }else if(this.props.user.isAdmin === false){
            this.props.history.push("/");
        }
    }
    render(){
        var content;
        switch(this.props.match.params.section){
            case "orders":
                content = <Orders/>;
                break;
            case "catalogue":
                content = <Catalogue/>;
                break;
            case "products":
                //gets product id from the url
                var paramStart = (this.props.location.pathname.indexOf(this.props.match.params.section));
                var paramEnd = paramStart + this.props.match.params.section.length + 1;//will include the '/'
                //this is the param on the 'admin/product/:param' route
                var productParam = this.props.location.pathname.substr(paramEnd, this.props.location.pathname.length - 1);
                
                if(productParam === "new"){
                    content = <NewProduct/>
                }else{
                    content = <EditProduct productId={productParam}/>;
                }
                break;
            default:
                content = 
                <section className="admin-content">
                    <h1>404 Page Not Found</h1>
                </section>;
        }
        return (
            <main className="admin-panel">
                <Nav adminLogout={this.props.adminLogout} user={this.props.user}/>
                {content}
            </main>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        adminLogout: () => dispatch(adminLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);