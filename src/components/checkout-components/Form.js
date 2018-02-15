import React, {Component} from 'react';
import {connect} from 'react-redux';

//STRIPE
var stripe = Stripe("pk_test_knmZxtHvvOfHES9riBjyypE4");

//ACTIONS
import {checkout} from '../../actions/cartActions';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            errors: {
                cardInfo: null,
                email: null,
                confirmEmail: null,
                name: null,
                location: null
            },
            address: null,
            email: null,
            confirmEmail: null,
            name: null,
            city: null,
            state: null,
            cardInput: null,
            formError: null
        }
        this.submitForm = this.submitForm.bind(this);
    }
    formInputUpdate(e, field){
        this.state[field] = e.target.value
        switch(field){
            case "email":
            case "confirmEmail":
                const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (emailRegEx.test(this.state.email) === false && this.state.email !== this.state.confirmEmail){
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {email: "Enter a valid email.", confirmEmail: "Emails do not match"})}));
                }
                else if(emailRegEx.test(this.state.email === false)){
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {email: "Enter a valid email.", confirmEmail: null})}));
                }else if(this.state.email !== this.state.confirmEmail){
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {confirmEmail: "Emails do not match.", email: null})}));
                }
                else{
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {email: null, confirmEmail: null})}));
                }
                break;
            case "city":
            case "state":
                if(/^[a-zA-Z\s]*$/.test(this.state.city) === false  || /[\W\d]/g.test(this.state.state) === true){
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {location: "City and state cannot contain numbers or special characters"})}));
                }else{
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {location: null})}));
                }
                break;
            case "name":
                if(/^[a-zA-Z\s]*$/.test(this.state.name) === false){
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {name: "Name cannot contain numbers or special characters"})}));
                }else{
                    this.setState(Object.assign({}, this.state, {errors: Object.assign({}, this.state.errors, {name: null})}));
                }
        }
    }
    cardInfoUpdate(event){
        if(event.error){
            this.setState(Object.assign({}, this.state, {errors: {cardInfo: event.error.message}}));
        }else {
            this.setState(Object.assign({}, this.state, {errors: {cardInfo: null}}));
        }
    }
    submitForm(e){
        e.preventDefault(); 

        //prevent user from accidentally submiting order multiple times
        var orderBtn = document.getElementById('submit-order');
        orderBtn.disabled = true;

        this.setState({formError: null});
        var validData = true;

        for (const error in this.state.errors) {
            if (this.state.errors.hasOwnProperty(error)) {
                const element = this.state.errors[error];
                if (element !== null) validData = false;
            }
        }

        if(!this.state.email || !this.state.address || !this.state.confirmEmail || !this.state.state || !this.state.city || !this.state.name){
            validData = false;
        }

        if(validData === true){
            stripe.createToken(this.cardInput).then((result)=> {
                if (result.error) {
                    this.setState({formError: "Please fill out the form completely"});

                    //re-enable button
                    orderBtn.disabled = false;
                } else {
                    var formData = {
                        name: this.state.name,
                        email: this.state.email,
                        address: this.state.address,
                        city: this.state.city,
                        state: this.state.state,
                        token: result.token,
                        cart: this.props.cart
                    }
                    this.props.checkout(formData);
                }
            });
        }else{
            this.setState({formError: "Please fill out the form completely"});
            
            //re-enable button
            orderBtn.disabled = false;
        }
    }
    componentDidMount(){
        //create stripe card element
        this.cardInput = stripe.elements().create("card");
        this.cardInput.mount("#stripe-card-element");

        this.cardInput.addEventListener('change', (event)=> this.cardInfoUpdate(event));
    }
    render(){
        return (
            <form onSubmit={(e)=> this.submitForm(e)}>
                <div className="field">
                    <label>Name </label>
                    <input id="name" type="text" placeholder="First and Last Name" onChange={(e)=> this.formInputUpdate(e, 'name')}/>
                    {this.state.errors.name &&
                        <div className='input-error'>
                            {this.state.errors.name}
                        </div>
                    }
                </div>
                <div className="field">
                    <label>Email </label>
                    <input id="email" type="email" placeholder="Email Address" onChange={(e)=> this.formInputUpdate(e, 'email')}/>
                    <small>This address will be used to contact you about your order. Make sure it is correct</small>
                    {this.state.errors.email && 
                        <div className='input-error'>
                            {this.state.errors.email}
                        </div>
                    }
                </div>
                <div className="field">
                    <label>Confirm Email </label>
                    <input id="confirm-email" type="email" placeholder="Re-enter Email Address" onChange={(e)=> this.formInputUpdate(e, 'confirmEmail')}/>
                    {this.state.errors.confirmEmail &&
                        <div className="input-error">
                            {this.state.errors.confirmEmail}
                        </div>
                    }
                </div>
                <div className="field">
                    <label>Shipping Address </label>
                    <input id="shipping" type="text" placeholder="Enter Your Shipping Address" onChange={(e)=> this.formInputUpdate(e, 'address')}/>
                </div>
                <div className="field">
                    <label>City </label>
                    <input id="city" type="text" placeholder="City" onChange={(e)=> this.formInputUpdate(e, "city")}/>

                    <label>State </label>
                    <input id="state" type="text" placeholder="State" maxLength="2" onChange={(e)=> this.formInputUpdate(e, 'state')}/>
                    {this.state.errors.location &&
                        <div className="input-error">
                            {this.state.errors.location}
                        </div>
                    }
                </div>
                <div className="field">
                    <label>Card Info </label>
                    <div id="stripe-card-element"></div>
                    <small>This is just a demo and will only accept test data. Please enter 4242 4242 4242 4242 as the card
                    number and any date in the future for the expiration date. Any random input will work for the cvc and zip code</small>
                    {this.state.errors.cardInfo &&
                        <div id="card-errors">{this.state.errors.cardInfo}</div>
                    }
                </div>
                <button className="order-btn" id="submit-order">Order Now</button>
                {this.state.formError &&
                    <div className="input-error">
                        {this.state.formError}
                    </div>
                }
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        checkout: (formData) => dispatch(checkout(formData))
    }
}

export default connect(null, mapDispatchToProps)(Form);