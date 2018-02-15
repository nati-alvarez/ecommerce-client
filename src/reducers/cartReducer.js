export default function reducer(state = (localStorage.getItem("cart"))? JSON.parse(localStorage.getItem("cart")) : {
    items: [], //array of products added to cart
    totalItems: 0,
    notificationText: null, //will contain message when item is succesfully added to cart
    checkoutError: null, //will contain error message if error occurs during checkout
    startCheckout: false,
    orderId: null //will be populated on successful order placement. Once populated, user will be redirected to order sucess page
}, action){
    switch(action.type){
        case "ADD_TO_CART":

            //if item is already in cart, just increase quantity on item
            var alreadyInCart = false;
            state.items.forEach(item=>{
                if (item.item._id === action.payload.product._id) alreadyInCart = true;
            });

            if(alreadyInCart){
                var items = state.items.map(product=>{
                    //if the id of item object === payload id,  update quantity
                    if(product.item._id === action.payload.product._id){
                        return Object.assign({}, product, {qty: product.qty + action.payload.qty});
                    }
                    //else return without modifying
                    return product;
                });

                var cart = Object.assign({}, state, {items},
                {
                    notificationText: "Item Added To Cart",
                    totalItems: state.totalItems + action.payload.qty,
                    totalPrice: items.reduce((cost, item)=>{
                        return cost + item.item.price * item.qty;
                    }, 0)
                });

                localStorage.setItem("cart", JSON.stringify(Object.assign({}, state, cart)))
                return cart;
            }

            //else append to cart
            var items = state.items.concat({
                item: action.payload.product,
                qty: action.payload.qty
            });

            var cart = {
                items: items,
                totalItems: state.totalItems + action.payload.qty,
                totalPrice: items.reduce((cost, item)=>{
                    return cost + item.item.price * item.qty;
                }, 0)
            }
            localStorage.setItem("cart", JSON.stringify(Object.assign({}, state, cart)))
            return Object.assign({}, state, cart, {notificationText: "Item Added To Cart"});
        case "UPDATE_QUANTITY":
            //determines wheter to add 1 or subtract one from cart total
            var totalItemsValue;
            var totalPriceValue;
            var cart = Object.assign({}, state, {items: state.items.map(product=>{
                //if the id of item object === payload id,  update quantity
                if(product.item._id === action.payload.productId){
                    //will either increase or decrease qty by 1
                    totalItemsValue = (product.qty > action.payload.qty)? -1 : 1;

                    //will add or subtract the dollar amount to total of product added or removed
                    totalPriceValue = product.item.price * totalItemsValue;
                    return Object.assign({}, product, {qty: action.payload.qty});
                }
                //else return without modifying
                return product;
            })}, {totalItems: state.totalItems + totalItemsValue}, {totalPrice: state.totalPrice + totalPriceValue });

            localStorage.setItem("cart", JSON.stringify(Object.assign({}, state, cart)))
            return cart;
        case "REMOVE_FROM_CART":
            var qtyToRemove = 0;
            var priceToRemove = 0;
            var cart = Object.assign({}, state, {items: state.items.filter(product=>{
                if(product.item._id !== action.payload.productId){
                    return product
                }else{
                    qtyToRemove += product.qty;
                    priceToRemove = product.item.price * product.qty
                }
            })}, {totalItems: state.totalItems - qtyToRemove, totalPrice: state.totalPrice - priceToRemove});

            localStorage.setItem("cart", JSON.stringify(Object.assign({}, state, cart)));
            return cart;
        case "CHECKOUT_START":
            return Object.assign({}, state, {startCheckout: true, checkoutError: null});
        case "CHECKOUT_SUCCESS":
            //re-enable button
            var orderBtn = document.getElementById('submit-order');
            orderBtn.disabled = false;
            return Object.assign({}, state, {startCheckout: false, orderId: action.payload._id, items: [], totalItems: 0});
        case "CHECKOUT_ERROR":
            //re-enable button
            var orderBtn = document.getElementById('submit-order');
            orderBtn.disabled = false;

            return Object.assign({}, state, {startCheckout: false, checkoutError: action.payload});
        case "CLEAR_NOTIFICATION":
            return Object.assign({}, state, {notificationText: null});
        case "CLEAR_ORDER_DATA":
            return Object.assign({}, state, {orderId: null});
        default:
            return state;
    }
}