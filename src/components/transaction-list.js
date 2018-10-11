/**
 * @module Components
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@app/styles/components/transaction-list.scss';
import SuperString from '@app/components/super-string';

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

		this.state = {
			sortBy: 'title',
			sortDir: 'asc'
		};
	}

	/**
	 * change the sort by and sort dir props
	 *
	 * @method sortBy
	 * @param type {string}
	 */
	sortBy(type) {
		let dir = 'asc';
		if (this.state.sortBy === type) {
			if (this.state.sortDir === 'asc') {
				dir = 'desc';
			}
		}
		this.setState({ sortBy: type, sortDir: dir });
	}

	/**
	 * sort a docRef array by the props currently set in
	 * the state obj.
	 *
	 * @method sortData
	 * @param data {object[]} unsorted object array
	 * @returns {object[]} sorted object array
	 */
	sortData(data) {
		// the key to sort data by
		const key = this.state.sortBy;

		// takes two objects and returns direction a should move in reference to b
		const moveUpDown = (a, b) => (a[key] < b[key] ? 1 : (b[key] < a[key] ? -1 : 0))

		return data.sort((a, b) =>
			this.state.sortDir === 'asc' ? moveUpDown(b, a) : moveUpDown(a, b)
		);
	}

	render() {
		if (this.props.models && this.props.models.length) {
			// sort data according to state.{sortby, sortDir}
			const models = this.sortData(this.props.models);
			const sortBy = this.state.sortBy;

			// setup sort classes for headers
			const activeSort = `t-item sortable ${this.state.sortDir}`;
			const inactiveSort = "t-item sortable";

			return (
				<div className="c-transaction-list" ref={this.listRef}>
					<div className="transaction-header">
						<span className={sortBy === 'title' ? activeSort : inactiveSort} onClick={() => this.sortBy('title')}>Title</span>
						<span className={sortBy === 'category' ? activeSort : inactiveSort} onClick={() => this.sortBy('category')}>Category</span>
						<span className={sortBy === 'amount' ? activeSort : inactiveSort} onClick={() => this.sortBy('amount')}>Amount</span>
						<span className="t-item">Notes</span>
					</div>

					<div className="transaction-body">
						{(() => {
							return models.map((model, idx) => {
								return (
									<div className="transaction-item" key={idx}>
										<span className="t-item title" title={model.title}>{model.title}</span>
										<span className="t-item category" title={model.category}>{model.category}</span>
										<span className="t-item amount" title={(`$${parseFloat(model.amount).toFixed(2)}`)}>
											{(`$${parseFloat(model.amount).toFixed(2)}`)}
										</span>

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
		} else {
			return <div className="c-transaction-list"></div>;
		}
	}
}

TrasactionList.propTypes = {
	models: PropTypes.array
};

export default TrasactionList;
