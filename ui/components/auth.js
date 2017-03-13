import React, {Component, PropTypes} from 'react';
import {browserHistory, setRedirectUrl} from 'react-router';
import {connect} from 'redux';

class AuthorizedContainer extends Component {
    static get propTypes() {
        return {
            children: React.PropTypes.func.isRequired,
            currentURL: PropTypes.string,
            dispatch: React.PropTypes.func
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
