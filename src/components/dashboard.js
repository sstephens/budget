/**
 * @module App
 *
 */
import React, { Component } from 'react';
import '@app/styles/components/dashboard.scss';
import injectService from '@app/utils/inject-service';
import SidePanel from '@app/components/side-panel';
import TransactionList from '@app/components/transaction-list';

/**
 * `Dashboard`
 *
 * Dashboard UI Component
 *
 * @class Dashboard
 */
class Dashboard extends Component {
	constructor() {
		super();

		this.firebase = injectService('firebase');

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
			<div className="c-dashboard">
				<div className="add-container">
					<div className="add-transaction" onClick={() => this.addTransaction()}>+</div>
				</div>

				<SidePanel isShowing={this.state.showSidePanel} onClose={() => this.closeTransaction()} />

				<div className="chart-data"></div>

				<div className="budget-data">
					<TransactionList />
				</div>
			</div>
		);
	}
}

export default Dashboard;
