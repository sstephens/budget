/**
 * @module Components
 *
 */
import { Promise } from 'rsvp';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '@app/styles/components/transaction-list.scss';
import SuperString from '@app/components/super-string';
import data from '@app/utils/mock-data';

/**
 * `TrasactionList`
 *
 * Renders a list of budget transactions into a list of html rows
 *
 * @class TrasactionList
 */
class TrasactionList extends Component {
	constructor() {
		super();

		// init state with empty models object
		this.state = { models: null, isLoaded: false };
	}

	componentDidMount() {
		loadData().then((results) =>
			this.setState(Object.assign({}, this.state, { models: results.data, isLoaded: true }))
		);
	}

	render() {
		if (!this.state.models) {
			if (this.state.isLoaded) {
				return (
					<div className="c-transaction-list empty">
						<h1>Create your first Budget Item</h1>
						<h2>Click on the plus button to get started.</h2>
					</div>
				);
			} else {
				return (
					<div className="c-transaction-list empty">
						<div className="loading">Loading...</div>
					</div>
				);
			}
		}

		return (
			<div className="c-transaction-list" ref={this.listRef}>
				<div className="transaction-header">
					<span className="t-item">Title</span>
					<span className="t-item">Category</span>
					<span className="t-item">Amount</span>
					<span className="t-item">Notes</span>
				</div>

				<div className="transaction-body">
					{(() => {
						return this.state.models.map((model, idx) => {
							return (
								<div className="transaction-item" key={idx}>
									<span className="t-item title" title={model.title}>{model.title}</span>
									<span className="t-item category" title={model.category}>{model.category}</span>
									<span className="t-item amount" title={model.amount}>{model.amount}</span>

									<span className="t-item notes">
										<SuperString text={model.notes} />
									</span>

									<div className="clear-float"></div>
								</div>
							);
						});
					})()}
				</div>
			</div>
		);
	}
}

// TrasactionList.propTypes = {

// };

const loadData = ()  => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(data.transaction), 500);
	});
};

export default TrasactionList;
