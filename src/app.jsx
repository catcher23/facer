import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

const BugFilter = React.createClass({
    render: function() {
        return (
            <div>A way to filter the list of bugs would come here.</div>
        )
    }
});

const BugRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.status}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.owner}</td>
                <td>{this.props.title}</td>
            </tr>
        )
    }
});

const BugTable = React.createClass({
    render: function() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Owner</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                <BugRow id={1} priority="P1" status="Open" owner="Ravan" title="App crashes on open" />
                <BugRow id={2} priority="P2" status="New" owner="Eddie" title="Misaligned border on panel" />
                </tbody>
            </table>
        )
    }
});

const BugAdd = React.createClass({
    render: function() {
        return (
            <div>A form to add a new bug would come here.</div>
        )
    }
});

const BugList = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter />
                <hr />
                <BugTable />
                <hr />
                <BugAdd />
            </div>
        )
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Redirect from="/" to="/bugs" />
        <Route path="/bugs" component={BugList} />
    </Router>, document.getElementById('facer'));