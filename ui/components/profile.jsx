import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {

    static get propTypes() {
        return {
            content: PropTypes.Object
        };
    }

    renderContent() {
        if (this.props.content) {
            return (
                <p>{this.props.content}</p>
            );
        }
        return undefined;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {content: state.auth.content};
}

export default connect(mapStateToProps, actions)(Profile);
