import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {getCatalogue} from '../../actions/ordersActions';

//COMPONENTS
import Order from './Order';

class Orders extends Component {
    componentDidMount(){
        this.props.getCatalogue()
    }
    render(){
        if(this.props.orders){
            var orders = this.props.orders.map((order)=>{
                return <Order key={order._id} order={order}/>
            });
        }
        return (
            <div>
                <section className="admin-content orders">
                    <h1>Recent Orders</h1>
                    {this.props.orders &&
                        <div className="orders-list">
                            <div className="table">
                                <div className="table-header">
                                    <div style={{visibility: "hidden"}}>
                                        &darr;
                                    </div>
                                    <div>
                                        Order Id
                                    </div>
                                    <div>
                                        Customer
                                    </div>
                                </div>
                                {orders}
                            </div>
                        </div>
                    }
                    {!this.props.orders &&
                        <p>No recent orders</p>
                    }
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        orders: state.admin.orders
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getCatalogue: () => dispatch(getCatalogue())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);