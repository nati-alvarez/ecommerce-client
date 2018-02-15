export default function reducer(state={
    products: null, //array of all products
    product: null //the product currently being viewed (will be populated when a user)
},action){
    switch(action.type){
        case "GET_PRODUCTS":
            return state;
        case "GET_PRODUCTS_SUCCESS":
            return Object.assign({}, state, {products: action.payload});
        case "GET_PRODUCT_SUCCESS":
            return Object.assign({}, state, {product: action.payload});
        case "DELETE_PRODUCT":
            console.log("deleting");
            return Object.assign({}, state, {products: state.products.filter(product=>{
                return product._id !== action.payload;
            })});
        default:
            return state;
    }
}