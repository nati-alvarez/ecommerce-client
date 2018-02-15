export default function reducer(state = {
    userame: localStorage.getItem("admin") || null,
    orders: null,
    product: null,
    createProduct: {
        loading: false,
        errorMessage: null,
        successMessage: null,
    },
    editProduct: {
        loading: false,
        errorMessage: null,
        successMessage: null
    }
}, action){
    switch (action.type){
        case "GET_ORDERS":
            return Object.assign({}, state, {orders: action.payload});
        case "GET_PRODUCT_SUCCESS":
            return Object.assign({}, state, {product: action.payload});
        case "CLEAR_PRODUCT_DATA":
            return Object.assign({}, state, {product: null});
        case "DELETE_PRODUCT":
            return Object.assign({}, state, {product: null});
        case "UPDATE_START":
            return Object.assign({}, state, {editProduct: Object.assign({}, state.editProduct, {successMessage: null, errorMessage: null, loading: true})});
        case "UPDATE_SUCCESS":
            return Object.assign({}, state, {editProduct: Object.assign({}, state.editProduct, {loading: false, successMessage: action.payload})});
        case "CLEAR_UPDATE_DATA":
            return Object.assign({}, state, {editProduct: Object.assign({}, state.editProduct, {successMessage: null})});
        case "CREATE_PRODUCT_START":
            return Object.assign({}, state, {createProduct: Object.assign({}, state.createProduct, {successMessage: null, errorMessage: null, loading: true})});
        case "CREATE_PRODUCT_SUCCESS":
            return Object.assign({}, state, {createProduct: Object.assign({}, state.createProduct, {loading: false, successMessage: action.payload})});
        case "CLEAR_CREATE_DATA":
            return Object.assign({}, state, {createProduct: Object.assign({}, state.createProduct, {successMessage: null})});
        default:
            return state;
    }
}