import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../actions/auth';

const renderField = field =>
    <div>
        <input
            className="form-control"
            {...field.input}
        />
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>;


function validate(formProps) {
    const {
        email,
        firstName,
        lastName,
        password,
        userName
    } = formProps;

    const errors = {};

    errors.firstName = firstName ? undefined : 'Please enter a first name';
    errors.email = email ? undefined : 'Please enter an email';
    errors.lastName = lastName ? undefined : 'Please enter a first name';
    errors.password = password ? undefined : 'Please enter a password';
    errors.userName = userName ? undefined : 'Please enter a username';

    return errors;
}

const form = reduxForm({
    form: 'register',
    validate
});

class Register extends Component {
    static get propTypes() {
        return {
            errorMessage: PropTypes.string,
            handleSubmit: PropTypes.func,
            registerUser: PropTypes.func,
        };
    }

    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
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
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                {this.renderAlert()}
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                            className="form-control"
                            component={renderField}
                            name="firstName"
                            type="text"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                            className="form-control"
                            component={renderField}
                            name="lastName"
                            type="text"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="email">Email</label>
                        <Field
                            className="form-control"
                            component={renderField}
                            name="email"
                            type="text"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="password">Password</label>
                        <Field
                            className="form-control"
                            component={renderField}
                            name="password"
                            type="password"
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                >
                Register
                </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, {registerUser})(form(Register));
