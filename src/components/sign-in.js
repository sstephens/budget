/**
 * @module Components
 *
 */
import { reject } from 'rsvp';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectService from '@app/utils/inject-service';
import '@app/styles/components/sign-in.scss';


/**
 * Simple password encryption for passing the password
 * over a http
 *
 * @method encryptPassword
 * @param pword {string}
 * @return {string}
 */
//const encryptPassword = (pword) => btoa(pword);

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
			error: null,
			isSignIn: true
		};

		// setup firebase service
		this.firebase = injectService('firebase');
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
			error: null,
			isSignIn: state
		});

		this.signinRef = React.createRef();
		this.signupRef = React.createRef();
	}

	/**
	 *
	 * @public
	 * @method triggerError
	 * @param error {string}
	 */
	triggerError(error) {
		//helper method to get error message
		let message = handleError(error);

		// update state with new values
		this.setState(Object.assign({}, this.state, { error: message }));
	}

	removeError() {
		this.setState(Object.assign({}, this.state, { error: null }));
	}

	signIntoAccount(evt) {
		this.removeError();

		const el = evt.target.parentNode;
		const email = el.querySelector('.email').value.trim()
		const password = el.querySelector('.password').value.trim();

		// handle error state if invaled input
		if (!(email && password && email.length && password.length)) {
			this.triggerError("Email or Password is incorrect");
		}

		this.firebase.auth
			.signInWithEmailAndPassword(email, password)
			.catch(error => this.triggerError(error));
	}

	createAccount(evt) {
		this.removeError();

		const el = evt.target.parentNode;
		const email = el.querySelector('.email').value.trim()
		const password = el.querySelector('.password').value.trim();
		const confirmPassword = el.querySelector('.confirm-password').value.trim()
		const fullname = el.querySelector('.fullname').value.trim();

		if (!(email && email.length)) return reject("Email is required");
		if (!(fullname && fullname.length)) return reject("Full Name is required");
		if (!(password && password.length)) return reject("Password is required");
		if (!(confirmPassword && confirmPassword.length)) return reject("Confirm password is required");
		if (password !== confirmPassword) return reject("Password does not match");

			// .then(auth => {
			//   window.console.log('auth', auth);
			//   return firebase.db.collection('userinfo').add({ email, fullname });
			// })

		return this.firebase.auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				return this.firebase.auth.currentUser.updateProfile({ displayName: fullname })
					.catch(error => this.triggerError(error));
			})
			.catch(error => this.triggerError(error));
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

						<input className="email" type="text" placeholder="Email" />
						<input className="password" type="password" placeholder="Password" />

						<a className="toggle-text" onClick={() => this.toggleSignIn(false)}>Create a new account.</a>
						<button className="d-button blue" onClick={(event) => this.signIntoAccount(event)}>Submit</button>

						<div className="clear-float"></div>
						<div className="errors">{this.state.error}</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="c-sign-in create-account">
					<div className="logo">Budget</div>
					<div className="account-form">
						<label>Create account</label>

						<input className="email" type="text" placeholder="Email" />
						<input className="password" type="password" placeholder="Password" />
						<input className="confirm-password" type="password" placeholder="Confirm Password" />
						<input className="fullname" type="text" placeholder="Full Name" />

						<a className="toggle-text" onClick={() => this.toggleSignIn(true)}>I already have an account!</a>
						<button className="d-button blue" onClick={(event) => this.createAccount(event)}>Submit</button>

						<div className="clear-float"></div>
						<div className="errors">{this.state.error}</div>
					</div>
				</div>
			);
		}
	}
}

const handleError = (err) => {
	if (!(err && err.code)) {
		window.console.log(err);
		throw new Error("handleError only accepts firebase error objects");
	}

	let msg = "An unknown error has occured";
	if (err.code === "auth/email-already-in-use") {
		msg = "Email is already in use";
	} else if (err.code === "auth/weak-password") {
		msg = "Password is too weak";
	} else if (err.code === "auth/invalid-email") {
		msg = "Email or password is invalid"
	} else if (err.code === "auth/user-disabled") {
		msg = "Your account is locked"
	} else if (err.code === "auth/user-not-found") {
		msg = "Email or password is invalid"
	} else if (err.code === "auth/wrong-password") {
		msg = "Email or password is invalid"
	}
	return msg;
};

SignIn.propTypes = {
	signUp: PropTypes.bool
};

export default SignIn;
