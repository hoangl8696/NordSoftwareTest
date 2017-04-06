import './App.css'
import React, { Component } from 'react';

export default class UserListHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <thead className='my-app-body-table-header-container'>
                <tr>
                    <th className='my-app-body-table-header' onClick={this.props.sort.bind(this, 'userName')}>Name</th>
                    <th className='my-app-body-table-header' onClick={this.props.sort.bind(this, 'emailAddress')}>Email</th>
                    <th className='my-app-body-table-header' colSpan='2' onClick={this.props.sort.bind(this, 'phoneNum')}>Phone Number</th>
                </tr>
            </thead>
        );
    }
}
