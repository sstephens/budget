/**
 * @module Components
 *
 */
import React, { Component } from 'react';
import '@app/styles/components/user-menu.scss';
import injectService from '@app/utils/inject-service';

/**
 * `UserMenu`
 *
 * User menu for log out and someday account settings
 *
 * @class UserMenu
 */
class UserMenu extends Component {
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
		// gennerate class name for user menu
		const menuClass = "c-user-menu" + (this.state.isMenuOpen ? " active" : "");

		return (
			<div className={menuClass} onClick={() => this.openMenu()}>
				<label>{this.firebase.auth.currentUser.displayName}<span><span></span></span></label>

				<div className="menu-container" onClick={() => this.closeMenu()}>
					<div className="menu">
						<span onClick={() => this.signout()}>Sign out</span>
					</div>
				</div>
			</div>
		);
	}
}

export default UserMenu;
