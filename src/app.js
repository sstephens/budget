/**
 * @module App
 *
 */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '@app/styles/app.scss';
import injectService from '@app/utils/inject-service';
import UserMenu from '@app/components/user-menu';
import Dashboard from '@app/components/dashboard';

/**
 * `App`
 *
 * Main application instance
 *
 * @class App
 */
class App extends Component {
	constructor() {
		super();

		this.firebase = injectService('firebase');

		// setup init state for SidePanel child element
		this.state = { isMenuOpen: false };
	}

	/**
	 * sign the user out of their account
	 *
	 * @method signout
	 */
	signout() {
		this.firebase.auth.signOut();
	}

	/**
	 * open the user menu
	 *
	 * @method openMenu
	 */
	openMenu() {
		// prevent rerender when called multiple times
		if (!this.state.isMenuOpen) {
			this.setState({ isMenuOpen: true });
		}
	}

	/**
	 * Close the user menu
	 *
	 * @method closeMenu
	 */
	closeMenu() {
		// prevent rerender when called multiple times
		if (this.state.isMenuOpen) {
			this.setState({ isMenuOpen: false });
		}
	}

	render() {

		return (
			<div className="application-main">
				<div className="application-header">
					<div className="application-logo">Budget</div>

					<UserMenu />
				</div>

				<div className="application-body">
					<Dashboard />
				</div>
			</div>
		);
	}
}

export default hot(module)(App);
