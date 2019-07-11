import React, { Component } from "react";
import * as EmailValidator from "email-validator";
import ValidationErrors from "../ValidationErrors/ValidationErrors"
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import ds from "../../STORE/dataService"
export default class LoginForm extends Component {
  static contextType = whereToGoContext
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currentUser: {},
      emailValid: null,
      passwordValid: null,
      formValid: null,
      emailValidationMessage: "",
      passwordValidationMessage: ""
    };
  }
  emailChanged(email) {
    this.setState({ email });
  }
  passwordChanged(password) {
    this.setState({ password });
  }
  validateLogin(email, password) {
    let emailErrors = { ...this.state.emailValidationMessage };
    let passwordErrors = { ...this.state.passwordValidationMessage };
    let isEmailValid = null;
    let isPasswordValid = null;
    email = email.trim();
    if (email.length === 0) {
      emailErrors = "Login email is required";
      isEmailValid = false;
    } else {
      if (!EmailValidator.validate(email)) {
        emailErrors = "Please input a valid email";
        isEmailValid = false;
      } else {
        emailErrors = "";
        isEmailValid = true;
      }
    }
    if (password.length === 0) {
      passwordErrors = "Login password is required";
      isPasswordValid = false;
    } else {
      passwordErrors = "";
      isPasswordValid = true;
    }

    this.setState(
      {
        emailValidationMessage: emailErrors,
        emailValid: isEmailValid,
        passwordValidationMessage: passwordErrors,
        passwordValid: isPasswordValid
      },
      this.formValid
    );
  }
  handleLoginSubmit = async (e, showToast = true) => {
    e && e.preventDefault();
    const { email, password } = this.state;
    // this.validateLogin(email, password);
    let user = await ds.doLogin(email, password)
    if (!user) {
      //TODO toast
    } else {
      this.context.set({ user })
      console.log('Logged in as', user.email)
      this.props.history.push("/home");
    }
  }
  render() {
    return (
      <div className="LoginPage-Container">
        <h2>Where to go!</h2>
        <p>
          Where to go is a trip management tool where you can store places you want to go for upcoming trips!
          </p>

        <h2>Login</h2>
        <form className="LoginForm" onSubmit={e => this.handleLoginSubmit(e)}>
          <label htmlFor="email"> Email:</label>
          <input
            type="text"
            id="email"
            onChange={e => this.emailChanged(e.target.value)}
          />
          <ValidationErrors
            hasError={!this.state.emailValid}
            message={this.state.emailValidationMessage}
          />
          <label htmlFor="password"> Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={e => this.passwordChanged(e.target.value)}
          />
          <ValidationErrors
            hasError={!this.state.passwordValid}
            message={this.state.passwordValidationMessage}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="padded-top">
          <p>Demo Email: demo@demo.com</p>
          <p>Demo Password: demo</p>
        </div>
      </div>
    )
  }
}