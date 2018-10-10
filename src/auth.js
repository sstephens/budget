/**
 * @module Auth
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@app/styles/auth.scss';
import injectService from '@app/utils/inject-service';
import SignIn from '@app/components/sign-in';

/***/
/**
 * `Auth`
 *
 * Component for managing a global auth user
 *
 * @class Auth
 */
class Auth extends Component {

	constructor() {
		super();

		this.state = {
			// boolean auth flag
			isAuthenticated: false,
			isLoaded: false,
			authUser: null
		};

		// setup firebase service
		this.firebase = injectService('firebase');

		this.firebase.auth.onAuthStateChanged(user => {
			this.setState({
				isAuthenticated: !user ? false : true,
				authUser: !user ? null : user,
				isLoaded: true
			});
		});
	}

	render() {
		if (this.state.isLoaded) {
			// if authenticated then show logged in app
			if (this.state.isAuthenticated) {
				return <div className="application-auth authenticated">{this.props.children}</div>;
			} else { // show sign in page
				return <SignIn />
			}
		}
		return (
			<div className="application-auth splash-screen">
				<div className="application-logo">Budget</div>
			</div>
		);
	}
}

Auth.propTypes = {
	children: PropTypes.element
};

export default Auth;

