import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
//import './login.sass';
import './login.css';
import { isRegno, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.regno)) {
            errors.regno = "Registration number can't be blank";
        } else if (!isRegno(formData.regno)) {
            errors.regno = "Please enter a valid Registration number";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 8, lte: 16, trim: true })) {
            errors.password = "Password's length must between 8 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    login = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
            alert("You are successfully signed in...");
            window.location.reload()
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="regno" validationState={ formSubmitted ? (errors.regno ? 'error' : 'success') : null }>
                            <ControlLabel>Registration Number</ControlLabel>
                            <FormControl type="text" name="regno" placeholder="Enter your Registration Number :" onChange={this.handleInputChange} />
                        { errors.regno &&
                            <HelpBlock>{errors.regno}</HelpBlock>
                        }
                        </FormGroup>
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                        { errors.password &&
                            <HelpBlock>{errors.password}</HelpBlock>
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;