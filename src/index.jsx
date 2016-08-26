import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from from './reducers'
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';

const UserFilter = React.createClass({
  render: function () {
    return (
      <div>A way to filter the list of users would come here.</div>
    )
  }
});

const UserRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.user.id}</td>
        <td>{this.props.user.status}</td>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.location}</td>
      </tr>
    )
  }
});

const UserTable = React.createClass({
  render: function () {
    const userRows = this.props.users.map((user) => {
      return <UserRow key={user.id} user={user}/>
    });
    return (
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {userRows}
        </tbody>
      </table>
    )
  }
});

const UserAdd = React.createClass({
  handleSubmit: function () {
    console.log('hello');
  },
  render: function () {
    return (
      <div>
        <form name="UserAdd">
          <input type="text" name="name" placeholder="location"/>
          <input type="text" name="location" placeholder="location"/>
          <button onClick={this.handleSubmit}>Create User</button>
        </form>
      </div>
    )
  }
});

const UserList = React.createClass({
  getInitialState: function () {
    return {users: []};
  },

  componentDidMount: function () {
    $.ajax('/api/users').done(function (data) {
      this.setState({users: data});
    }.bind(this));
  },

  addUser: function (user) {
    $.ajax({
      type: 'POST', url: '/api/users', contentType: 'application/json',
      data: JSON.stringify(user),
      success: function (user) {
        let newUsers = this.state.users.concat(user);
        this.setState({users: newUsers});
      }.bind(this),
      error: function (xhr, status, err) {

      }
    });
  },

  render: function () {
    return (
      <div>
        <h1>User Tracker</h1>
        <UserFilter />
        <hr />
        <UserTable users={userData}/>
        <hr />
        <UserAdd />
      </div>
    )
  }
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={UserList}/>
    </Router>
  </Provider>,
  document.getElementById('root'));