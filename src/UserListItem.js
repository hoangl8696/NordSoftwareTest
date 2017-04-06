import React, { Component } from 'react';
import _ from 'lodash'
import User from './Users.js'
import './App.css'

export default class UserListItem extends Component {
    constructor(props) {
        super(props)
        this.state = { name: [this.props.userListItem.userName], email: [this.props.userListItem.emailAddress], phone: [this.props.userListItem.phoneNum], isEdditing: false, isValid: false }
    }

    //Switch to edit mode
    edit() {
        this.setState({ isEdditing: true, isValid: true })
    }

    //Switch to normal mode
    cancel() {
        this.setState({ isEdditing: false })
    }

    //Save edited user
    save() {
        event.preventDefault()
        let edditedUser = new User()
        edditedUser.id = this.props.userListItem.id
        edditedUser.userName = this.state.name
        edditedUser.emailAddress = this.state.email
        edditedUser.phoneNum = this.state.phone
        this.props.edditUser(edditedUser)
        this.setState({ isEdditing: false })
    }

    //Validation, see AddUser.js for more info
    validate(event) {
        this.setState({ [event.target.name]: [event.target.value] }, () => {
            let name = String(this.state.name)
            let email = String(this.state.email)
            let phone = String(this.state.phone)

            const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const phoneRegExp = /^\d{10}$/;

            if (name.length === 0 || email.length === 0 || phone.length === 0 || !emailRegExp.test(email) || !phoneRegExp.test(phone)) {
                this.setState({ isValid: false })
            } else {
                this.setState({ isValid: true })
            }
        });
    }

    //Helper method, help render correct save button according to form validation, see AddUser.js for more info
    renderValidatedSaveButton() {
        if (this.state.isValid) {
            return (
                <button className='my-app-body-table-row-button-4-valid' onClick={this.save.bind(this)}>Save</button>
            )
        }
        return (
            <button className='my-app-body-table-row-button-4-invalid' disabled='true' onClick={this.save.bind(this)}>Save</button>
        )

    }

    //Helpmer method, help render correct buttons according to the current mode (edit or normal)
    renderActionButton() {
        if (!this.state.isEdditing) {
            return (
                <td className='my-app-body-table-row-button'>
                    <i className='fa fa-pencil my-app-body-table-row-button-1' onClick={this.edit.bind(this)}></i>
                    <i className='fa fa-trash my-app-body-table-row-button-2' onClick={this.props.deleteUser.bind(this, this.props.userListItem.id)}></i>
                </td>
            )
        }
        return (
            <td className='my-app-body-table-row-button'>
                <button className='my-app-body-table-row-button-3' onClick={this.cancel.bind(this)}>Cancel</button>
                {this.renderValidatedSaveButton()}
            </td>
        )
    }

    render() {
        if (this.state.isEdditing) {
            return (
                <tr className='my-app-body-table-row-container'>
                    <td className='my-app-body-table-row-item-1'>
                        <input className='my-app-body-table-row-item-input-1' type='text' placeholder='Full name' maxLength='30' name='name' value={this.state.name} onChange={this.validate.bind(this)} />
                    </td>
                    <td className='my-app-body-table-row-item-2'>
                        <input className='my-app-body-table-row-item-input-2' type='text' placeholder='E-mail address' maxLength='30' name='email' value={this.state.email} onChange={this.validate.bind(this)} />
                    </td>
                    <td className='my-app-body-table-row-item'>
                        <input className='my-app-body-table-row-item-input-3' type='text' placeholder='Phone Number' maxLength='10' name='phone' value={this.state.phone} onChange={this.validate.bind(this)} />
                    </td>
                    {this.renderActionButton()}
                </tr>
            )
        }
        return (
            <tr className='my-app-body-table-row-container'>
                <td className='my-app-body-table-row-item-1'>
                    {this.props.userListItem.userName}
                </td>
                <td className='my-app-body-table-row-item-2'>
                    {this.props.userListItem.emailAddress}
                </td>
                <td className='my-app-body-table-row-item'>
                    {this.props.userListItem.phoneNum}
                </td>
                {this.renderActionButton()}
            </tr>
        );
    }
}
