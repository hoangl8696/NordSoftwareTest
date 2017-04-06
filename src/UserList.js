import React, { Component } from 'react';
import UserListHeader from './UserListHeader.js'
import _ from 'lodash'
import UserListItem from './UserListItem.js'
import './App.css'

export default class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    //Helper method, iterate through the passed array and create new items for the table
    renderUserList() {
        return _.map(this.props.userList, (user, index) => {
            return <UserListItem key={index} userListItem={user} deleteUser={this.props.deleteUser.bind(this)} edditUser={this.props.edditUser.bind(this)} />
        })
    }

    render() {
        return (
            <table className='my-app-body-table-container'>
                <UserListHeader sort={this.props.sort.bind(this)} />
                <tbody>
                    {this.renderUserList()}
                </tbody>
            </table>
        );
    }
}
