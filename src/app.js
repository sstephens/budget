/**
 * @module App
 *
 */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '@app/styles/app.scss';
import injectService from '@app/utils/inject-service';
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

	signout() {
		this.firebase.auth.signOut();
	}

	openMenu() {
		this.setState({ isMenuOpen: true });
	}

	closeMenu() {
		this.setState({ isMenuOpen: false });
	}

	render() {
		const menuClass = "application-user" + (this.state.isMenuOpen ? " active" : "");

		return (
			<div className="application-main">
				<div className="application-header">
					<div className="application-logo">Budget</div>
					<div className={menuClass} onClick={() => this.openMenu()}>
						<label>{this.firebase.auth.currentUser.displayName}<span><span></span></span></label>
						<div className="menu-container" onClick={() => this.closeMenu()}>
							<div className="menu">
								<span onClick={() => this.signout()}>Sign out</span>
							</div>
						</div>
					</div>
				</div>
				<div className="application-body">
					<Dashboard />
				</div>
			</div>
		);
	}
}

export default hot(module)(App);
