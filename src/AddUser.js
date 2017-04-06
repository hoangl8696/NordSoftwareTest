import React, { Component } from 'react';
import User from './Users'
import './App.css'

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', email: '', phone: '', isValid: false }
    }

    //Method to add new user
    addUser(event) {
        event.preventDefault()
        this.props.addUser(this.createNewUser())
        this.resetState()
    }

    //Helper method, help create new User object and initialize data
    createNewUser() {
        let newUser = new User()
        newUser.userName = this.state.name
        newUser.emailAddress = this.state.email
        newUser.phoneNum = this.state.phone
        return newUser
    }

    //Helper method, help reset initial state once new user has been added
    resetState() {
        this.setState({ name: '', email: '', phone: '', isValid: false })
    }

    //Validate input
    validate(event) {
        this.setState({ [event.target.name]: [event.target.value] }, () => {

            //Cast to string for easy manipulation
            let name = String(this.state.name)
            let email = String(this.state.email)
            let phone = String(this.state.phone)

            //Regular expression to test phone and email address
            //Phone number need to be integer, 10 char, eg: 1234567890 is a valid phone number
            //Valid email address: 
            // mysite@ourearth.com
            // my.ownsite@ourearth.org
            // mysite@you.me.net
            //Invalid email address:
            // mysite.ourearth.com [@ is not present] 
            // mysite@.com.my [ tld (Top Level domain) can not start with dot "." ]
            // @you.me.net [ No character before @ ]
            // mysite123@gmail.b [ ".b" is not a valid tld ]
            // mysite@.org.org [ tld can not start with dot "." ]
            // .mysite@mysite.org [ an email should not be start with "." ]
            // mysite()*@gmail.com [ here the regular expression only allows character, digit, underscore, and dash ]
            // mysite..1234@yahoo.com [double dots are not allowed]
            const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const phoneRegExp = /^\d{10}$/;

            //Test user input real time
            if (name.length === 0 || email.length === 0 || phone.length === 0 || !emailRegExp.test(email) || !phoneRegExp.test(phone)) {
                this.setState({ isValid: false })
            } else {
                this.setState({ isValid: true })
            }
        });
    }

    //Helper method, help render correct button style according to validity of the form
    renderButton() {
        if (this.state.isValid) {
            return (
                <input className='my-app-body-form-add-button-valid' type='submit' value='Add new' />
            )
        }
        return (
            <input className='my-app-body-form-add-button-invalid' disabled='true' type='submit' value='Add new' />
        )
    }

    render() {
        return (
            <form  className='my-app-body-form-container' onSubmit={this.addUser.bind(this)}>
                <input className='my-app-body-form-input-1' type='text' placeholder='Full name' maxLength='30' name='name' value={this.state.name} onChange={this.validate.bind(this)} />
                <input className='my-app-body-form-input-2' type='text' placeholder='E-mail address' maxLength='30' name='email' value={this.state.email} onChange={this.validate.bind(this)} />
                <input className='my-app-body-form-input-3' type='text' placeholder='Phone Number' maxLength='10' name='phone' value={this.state.phone} onChange={this.validate.bind(this)} />
                {this.renderButton()}
            </form>
        );
    }
}
