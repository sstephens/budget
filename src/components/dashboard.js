/**
 * @module App
 *
 */
import React, { Component } from 'react';
import '@app/styles/components/dashboard.scss';
import injectService from '@app/utils/inject-service';
import AddTransaction from '@app/components/add-transaction';
import TransactionList from '@app/components/transaction-list';
import TransactionCharts from '@app/components/transaction-charts';
import data from '@app/utils/mock-data';

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
		this.state = {
			models: null,
			showSidePanel: false,
			isLoaded: false,
		};
	}

	componentDidMount() {
		// load user
		this.user = this.firebase.auth.currentUser;

		// load data
		this.load();
	}

	reloadData() {
		this.setState(Object.assign({}, this.state, { isLoaded: false }));
		this.load();
	}

	load() {
		if (process.env.TESTING) {
			// time simulates an async api call waiting
			setTimeout(() => {
				this.setState(Object.assign({}, this.state, { models: data.transaction, isLoaded: true }));
			}, 500);
		}

		this.firebase.db
			.collection('transaction')
			.where("userid", "==", this.user.uid)
			.get()
			.then(snapshot => {
				if (snapshot.metadata.fromCache) {
					this.load();
				} else {
					this.setState(Object.assign({}, this.state, { models: snapshot.docs, isLoaded: true }))
				}
			})
	}

	/**
	 * Event callback to show the side menu
	 *
	 * @private
	 * @method closeTransaction
	 */
	addTransaction() {
		this.setState(Object.assign({}, this.state, { showSidePanel: true }));
	}

	/**
	 * Event callback to hide the side menu
	 *
	 * @private
	 * @method closeTransaction
	 */
	closeTransaction() {
		this.setState(Object.assign({}, this.state, { showSidePanel: false }));
	}

	render() {

		return (
			<div className="c-dashboard">
				<div className="add-container">
					<div className="add-transaction" onClick={() => this.addTransaction()}>+</div>
				</div>

				<AddTransaction isShowing={this.state.showSidePanel} onClose={() => this.closeTransaction()} onSave={() => this.reloadData()} />

				{(() => {
					if (!this.state.isLoaded) {
						return (
							<div className="budget-data empty">
								<div className="loading">Loading...</div>
							</div>
						);
					} else {
						if (this.state.models && this.state.models.length) {
							return (
								<div className="budget-data">
									<TransactionCharts models={this.state.models} />
									<TransactionList models={this.state.models} />
								</div>
							);
						} else {
							return (
								<div className="budget-data empty">
									<h1>Create your first Budget Item</h1>
									<h2>Click on the plus button to get started.</h2>
								</div>
							);
						}
					}
				})()}
			</div>
		);
	}
}

export default Dashboard;
