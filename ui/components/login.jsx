import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {loginUser} from '../actions';

const form = reduxForm({
    form: 'login'
});

class Login extends Component {
    static get propTypes() {
        return {
            errorMessage: PropTypes.string,
            handleSubmit: PropTypes.func,
            loginUser: PropTypes.func,
        };
    }

    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
        return undefined;
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    {this.renderAlert()}
                    <div>
                        <label htmlFor={'email'}>Email</label>
                        <Field
                            className="form-control"
                            component="input"
                            name="email"
                            type="text"
                        />
                    </div>
                    <div>
                        <label htmlFor={'password'}>Password</label>
                        <Field
                            className="form-control"
                            component="input"
                            name="password"
                            type="password"
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                    Login
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, {loginUser})(form(Login));
