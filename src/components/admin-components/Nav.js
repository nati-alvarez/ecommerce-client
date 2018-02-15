import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render(){
        return (
            <nav className="admin-nav">
                <div className="nav-left">
                    <Link to={"/admin/orders"}>Orders</Link>
                    <Link to={"/admin/catalogue"}>Catalogue</Link>
                </div>
                {this.props.user &&
                    <div className="nav-right">
                        Welcome {this.props.user.username}
                        <button onClick={this.props.adminLogout} className="logout-btn">Logout</button>
                    </div>
                }
            </nav>
        )
    }
}

export default Nav;