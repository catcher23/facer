import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

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

const userData = [
  {id: 1, status: 'Online', name: 'Danny', location: 'San Francisco'},
  {id: 2, status: 'Offline', name: 'Dan', location: 'Fremont'},
];


const UserList = React.createClass({
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

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={UserList}/>
  </Router>, document.getElementById('facer'));