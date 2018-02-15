import React, {Component} from 'react';

//ASSETS
import downArr from '../../images/down_arrow.svg';

class Order extends Component {
    showMore(id, e){
        var id = "more"+ id;
        var moreInfo = document.getElementById(id);

        if(!moreInfo.style.display || moreInfo.style.display === "none"){
            moreInfo.style.display = "block"; 
            e.target.style.transform = "rotate(180deg)";
        }else {
            moreInfo.style.display = "none";
            e.target.style.transform = "rotate(0deg)";
        }
    }
    render(){
        return (
            <div className="table-row">
                <div className="table-row-content">
                    <div className="show-more"> 
                        <img onClick={(e)=> this.showMore(this.props.order._id, e)} className="down-arr" width="15" height="15" alt="show more" src={downArr}/>
                    </div>
                    <div>{this.props.order._id}</div>
                    <div>{this.props.order.customer.name}</div>
                </div>
                <div className="more" id={"more"+ this.props.order._id}>
                    <div className="nest">
                    Order:
                        <div className="nest"><p>Order Id: {this.props.order._id}</p></div>
                        <div className="nest">
                            Customer:
                            <div className="nest">
                                <p>name: {this.props.order.customer.name}</p>
                                <p>email: {this.props.order.customer.email}</p>
                            </div>
                        </div>
                        <div className="nest">
                            Shipping: 
                            <div className="nest">
                                <p>address: {this.props.order.shipping.address}</p>
                                <p>city: {this.props.order.shipping.city}</p>
                                <p>state: {this.props.order.shipping.state}</p>
                            </div>
                        </div>
                        <div className="nest">
                            Cart:
                            <div className="nest">
                                <p>total: ${this.props.order.cart.totalPrice / 100}</p>
                                <p>purchases:
                                    <div className="nest">
                                        {this.props.order.cart.items.map(item=>{
                                            return (
                                              <p>product:
                                                  <div className="nest">
                                                    <p>id: {item.item._id}</p>
                                                    <p>name: {item.item.name} </p>
                                                    <p>sku: {item.item.sku} </p>
                                                    <p>price: ${item.item.price /100}</p>
                                                    <p>qty: {item.qty}</p>
                                                  </div>
                                              </p>
                                            );
                                        })}
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;