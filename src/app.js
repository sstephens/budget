/**
 * @module App
 *
 */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '@app/styles/app.scss';

import SidePanel from '@app/components/side-panel';
import TransactionList from '@app/components/transaction-list';

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

		// setup init state for SidePanel child element
		this.state = { showSidePanel: false };
	}

	/**
	 * Event callback to show the side menu
	 *
	 * @private
	 * @method closeTransaction
	 */
	addTransaction() {
		this.setState({ showSidePanel: true });
	}

	/**
	 * Event callback to hide the side menu
	 *
	 * @private
	 * @method closeTransaction
	 */
	closeTransaction() {
		this.setState({ showSidePanel: false });
	}

	render() {
		return (
			<div className="application-main">
				<div className="application-header">
					<div className="application-logo">Budget</div>

					<div className="add-container">
						<div className="add-transaction" onClick={() => this.addTransaction()}>+</div>
					</div>
				</div>

				<div className="application-body">
					<SidePanel isShowing={this.state.showSidePanel} onClose={() => this.closeTransaction()} />

					<div className="chart-data">
					</div>

					<div className="raw-data">
						<TransactionList />
					</div>
				</div>
			</div>
		);
	}
}

export default hot(module)(App);
