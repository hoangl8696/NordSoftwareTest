import React, { Component } from 'react';
import './App.css';
import User from './Users.js'
import _ from 'lodash'
import AddUser from './AddUser.js'
import UserList from './UserList.js'
import NordSoftwareLogo from './NordSoftwareLogo.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { userList: [User] }
  }

  //Set up the 20 initial users
  componentWillMount() {
    for (let i = 0; i < 20; i++) {
      this.state.userList.push(new User());
    }
    this.state.userList.shift()
    this.setState({ userList: this.state.userList });
  }

  //Method to add new user
  addUser(user) {
    this.state.userList.push(user)
    this.setState({ userList: this.state.userList })
  }

  //Method to delete old user
  deleteUser(id) {
    _.remove(this.state.userList, user => user.id === id)
    this.setState({ userList: this.state.userList })
  }

  //Method to eddit existed user
  edditUser(user) {
    const foundedUser = _.find(this.state.userList, foundUser => foundUser.id === user.id)
    foundedUser.userName = user.userName
    foundedUser.emailAddress = user.emailAddress
    foundedUser.phoneNum = user.phoneNum
    this.setState({ userList: this.state.userList })
  }

  //Sort email column
  sortEmail() {
    this.state.userList = this.state.userList.sort((user1, user2) => user1.emailAddress > user2.emailAddress ? 1 : (user1.emailAddress < user2.emailAddress ? -1 : 0))
  }

  //Sort name column
  sortName() {
    this.state.userList = this.state.userList.sort((user1, user2) => user1.userName > user2.userName ? 1 : (user1.userName < user2.userName ? -1 : 0))
  }

  //Sort phone column
  sortPhoneNumber() {
    this.state.userList = this.state.userList.sort((user1, user2) => user1.phoneNum > user2.phoneNum ? 1 : (user1.phoneNum < user2.phoneNum ? -1 : 0))
  }

  //Figure sort type, sort accordingly
  sort(type) {
    switch (type) {
      case 'userName':
        this.sortName()
        break
      case 'phoneNum':
        this.sortPhoneNumber()
        break
      case 'emailAddress':
        this.sort.emailAddress()
        break
    }
    this.setState({ userList: this.state.userList })
  }

  render() {
    return (
      <div className='my-app-container'>
        <div className='my-app'>

          <div className='my-app-header-container'>
            <div className='my-app-header'> 
                <img className='logo' src={NordSoftwareLogo}/>
                <div>Nord Software</div>
            </div>
          </div>

          <div className='my-app-body-container'>
            <div className='my-app-body'>
              <h1 className='my-app-body-title'>List of participants</h1>
              <AddUser addUser={this.addUser.bind(this)} />
              <UserList userList={this.state.userList} deleteUser={this.deleteUser.bind(this)} edditUser={this.edditUser.bind(this)} sort={this.sort.bind(this)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
