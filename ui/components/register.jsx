import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../actions';

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
            content: PropTypes.Object
        };
    }

    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div className="row">
            <div className="col-md-6">
            <label>First Name</label>
            <Field name="firstName" className="form-control" component={renderField} type="text" />
            </div>
            <div className="col-md-6">
            <label>Last Name</label>
            <Field name="lastName" className="form-control" component={renderField} type="text" />
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" />
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" />
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
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

export default connect(mapStateToProps, { registerUser })(form(Register));
