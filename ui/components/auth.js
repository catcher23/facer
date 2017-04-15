import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory, setRedirectUrl} from 'react-router';
import {connect} from 'react-redux';

const isLoggedIn = true;

class AuthorizedContainer extends Component {
    static get propTypes() {
        return {
            children: PropTypes.func.isRequired,
            currentURL: PropTypes.string,
            dispatch: PropTypes.func
        };
    }

    componentDidMount() {
        const {dispatch, currentURL} = this.props;

        if (!isLoggedIn) {
            dispatch(setRedirectUrl(currentURL));
            browserHistory.replace('/login');
        }
    }

    render() {
        if (isLoggedIn) {
            return this.props.children;
        }
        return null;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        currentURL: ownProps.location.pathname,
        isLoggedIn: state.loggedIn,
    };
}

export default connect(mapStateToProps)(AuthorizedContainer);
