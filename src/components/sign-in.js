/**
 * @module Components
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@app/styles/components/sign-in.scss';

const SIGNIN_FAIL_ERROR = "Email or Password is incorrect";
const SIGNUP_FAIL_ERROR = "There was an error creating your account";

/**
 * Simple password encryption for passing the password
 * over a http
 *
 * @method encryptPassword
 * @param pword {string}
 * @return {string}
 */
const encryptPassword = (pword) => btoa(pword);

/**
 * `SignIn`
 *
 * Sign in/up Componet
 *
 * @class SignIn
 */
class SignIn extends Component {
	constructor() {
		super();

		// init state { email, pword } are empty strings
		// isSignIn is a boolean to manage view state between
		// signup and signin
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			fullname: '',
			isSignIn: true
		};
	}

	/**
	 * toggle the view state between sign in and sign up
	 *
	 * @method toggleSignIn
	 */
	toggleSignIn(state) {
		if (typeof state !== 'boolean') {
			throw new Error("You passed a state that is invalid to SignIn.toggleSignIn(state: boolean)");
		}

		// on toggle sign in state then reset
		// all the form inputs
		this.setState({
			email: '',
			password: '',
			confirmPassword: '',
			fullname: '',
			isSignIn: state
		});
	}

	/**
	 * update the state with new values for email, password, and fullname
	 *
	 * @public
	 * @method updateState
	 * @param newState {object}
	 */
	updateState(newState) {
		// update state with new values
		this.setState(Object.assign({}, this.state, parseStateParams(newState)));
	}


	signIntoAccount() {
		const email = this.state.email.trim()
		const pword = this.state.password.trim();

		signIn({ email, password: pword })
			//.then(data => setAuthUser(data))
			.catch(error => this.updateState({ error }));
	}

	createAccount() {
		const email = this.state.email.trim()
		const pword = this.state.password.trim();
		const cfpword = this.state.confirmPassword.trim()
		const fullname = this.state.fullname.trim();

	}

	render() {
		// get isSignIn state
		let isSignIn = this.state.isSignIn;

		// props signUp boolean is an override from the parent
		// view incase the parent needs to direct to signup page
		if (this.props.signUp) {
			isSignIn = false;
		}

		// if isSignIn => show signin form else signup form
		if (isSignIn) {
			return (
				<div className="c-sign-in">
					<div className="logo">Budget</div>
					<div className="account-form">
						<label>Sign In</label>

						<input type="text" placeholder="Email" onChange={(evt) => this.updateState({ email: evt.target.value })} value={this.email} />
						<input type="password" placeholder="Password" onChange={(evt) => this.updateState({ password: evt.target.value })} value={this.password} />

						<a className="toggle-text" onClick={() => this.toggleSignIn(false)}>Create Account</a>
						<button className="d-button blue" onClick={(evt) => this.signIntoAccount(evt)}>Submit</button>

						<div className="clear-float"></div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="c-sign-in create-account">
					<div className="logo">Budget</div>
					<div className="account-form">
						<label>Create an account</label>

						<input type="text" placeholder="Email" onChange={(evt) => this.updateState({ email: evt.target.value })} value={this.email} />
						<input type="text" placeholder="Full Name" onChange={(evt) => this.updateState({ fullname: evt.target.value })} value={this.fullname} />
						<input type="password" placeholder="Password" onChange={(evt) => this.updateState({ password: evt.target.value })} value={this.password} />
						<input type="password" placeholder="Confirm Password" onChange={(evt) => this.updateState({ confirmPassword: evt.target.value })} value={this.confirmPassword} />

						<a className="toggle-text" onClick={() => this.toggleSignIn(true)}>Sign In</a>
						<button className="d-button blue" onClick={(evt) => this.createAccount(evt)}>Submit</button>

						<div className="clear-float"></div>
					</div>
				</div>
			);
		}
	}
}

const parseStateParams = ({ email, password, confirmPassword, fullname, error }) => {
	const update = {};

	// set email if email was provided
	if (email !== undefined && email !== null) {
		update.email = email;
	}

	// set password if password was provided
	if (password !== undefined && password !== null) {
		update.password = password;
	}

	// set confirmPassword if confirmPassword was provided
	if (confirmPassword !== undefined && confirmPassword !== null) {
		update.confirmPassword = confirmPassword;
	}

	// set fullname if fullname was provided
	if (fullname !== undefined && fullname !== null) {
		update.fullname = fullname;
	}

	if (error !== undefined && error !== null) {
		update.error = error;
	}
	return update;
};

const sendSignIn = ({ email, password }) => {
	// handle error state if invaled input
	if (!(email && password && email.length && password.length)) {
		return reject(SIGNIN_FAIL_ERROR);
	}

	const data = {
		email,
		password: encryptPassword(password),
	};

	window.console.log('sign in', data);
	return resolve(data);
};

const sendCreate = ({ email, fullname, password, confirmPassword }) => {
	if (!(email && email.length)) return reject("Email is required");
	if (!(fullname && fullname.length)) return reject("Full Name is required");
	if (!(password && password.length)) return reject("Password is required");
	if (!(confirmPassword && confirmPassword.length)) return reject("Confirm password is required");
	if (password !== confirmPassword) return reject("Password does not match");

	const data = { email, fullname, password: encryptPassword(password) };

	window.console.log('create account', data);
	return resolve(data);
};


SignIn.propTypes = {
	signUp: PropTypes.bool
};

export default SignIn;
