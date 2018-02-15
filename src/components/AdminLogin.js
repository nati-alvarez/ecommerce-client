import React, {Component} from 'react';
import {connect} from 'react-redux';

//ACTIONS
import {adminLogin} from '../actions/adminActions';

class AdminLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: {
                username: null,
                password: null
            }
        }
        this.submitForm = this.submitForm.bind(this);
    }
    updateInput(e, field){
        switch(field){
            case "username":
                this.setState({input: Object.assign({}, this.state.input, {username: e.target.value})});
                break;
            case "password":
                this.setState({input: Object.assign({}, this.state.input, {password: e.target.value})});
                break;
        }
    }
    submitForm(){
        this.props.adminLogin(this.state.input);
    }
    componentDidMount(){
        if(this.props.user){
            if(this.props.user.isAdmin) this.props.history.push("/admin/orders");
        }
    }
    componentDidUpdate(){
        if(this.props.user){
            if(this.props.user.isAdmin) this.props.history.push("/admin/orders");
        }
    }
    render(){
        return (
            <div className="admin-login-form">
                <h1>Admin Login</h1>
                <div className="input-field">
                    <label>Username:</label>
                    <input onChange={(e)=> this.updateInput(e, 'username')} type="text"/>
                </div>
                <div className="input-field">
                    <label>Password:</label>
                    <input onChange={(e)=> this.updateInput(e, 'password')} type="password"/>
                </div>
                <button onClick={this.submitForm} className="login-button">Login</button>
                {this.props.loginInfo.loading &&
                    <p className="loading">loading...</p>
                }
                {this.props.loginInfo.errorMessage &&
                    <p className="error-message">{this.props.loginInfo.errorMessage}</p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.auth.user,
        loginInfo: state.auth.loginInfo
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        adminLogin: (body) => dispatch(adminLogin(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);