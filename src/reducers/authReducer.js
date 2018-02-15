export default function reducer(state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loginInfo: {
        loading: false,
        errorMessage: null,
    }
}, action){
    switch(action.type){
        case "LOG_IN_SUCCESS":
            return {user: "username", isLoggedIn: true, token: "token"};
        case "ADMIN_LOGIN_START":
            return {loginInfo: Object.assign({}, state.loginInfo, {loading: true, errorMessage: null})}
        case "ADMIN_LOGIN_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            return {user: action.payload.user, token: action.payload.token, loginInfo: Object.assign({}, state.loginInfo, {loading: false})} 
        case "ADMIN_LOGIN_ERROR":
            return {loginInfo: Object.assign({}, state.loginInfo, {errorMessage: action.payload, loading: false})};
        case "ADMIN_LOGOUT":
            return {user: null, token: null};
        default:
            return state;
    }
}