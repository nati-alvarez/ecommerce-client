import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//ASSETS
import palmTree from '../../images/palm-tree.svg';
import cart from '../../images/cart.svg';

class ShopNav extends Component {
    render(){
        //shows link to user account if logged in
        //else shows login/signup buttons
        var profileInfo;
        if(this.props.auth.isLoggedIn === "true"){
            profileInfo = 
                (<div className='profile'>
                   {this.props.auth.user.username}
                </div>);
            
        }else {
            profileInfo = 
                (<div className='buttons'>
                    <button id="login-btn">Login</button>
                    <button id="signup-btn">Sign up</button>
                </div>);   
        }

        return(
            <nav>
                <div className="nav-left">
                    <Link to="/">
                        <div className="brand">
                            <img src={palmTree} width='35' height='35' alt='A palm tree'/> &nbsp;Gamer's Gulf
                        </div>
                    </Link>
                </div>
                <div className="nav-right">
                    <div className="account">
                        {profileInfo}
                    </div>
                    <div className="cart-btn">
                        <Link to="/cart">
                            <img src={cart} height="25" width="25"/>
                            {this.props.totalCartItems > 0 &&
                                <span className="cart-total">{this.props.totalCartItems}</span>
                            }
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        auth: state.auth,
        totalCartItems: state.cart.totalItems
    }
}

export default connect(mapStateToProps)(ShopNav);