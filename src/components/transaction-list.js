
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import data from '@app/utils/mock-data';
import '@app/styles/components/transaction-list.scss';

const models = data.transaction.data;

class TrasactionList extends Component {
	constructor() {
		super();
		this.state = { models };
	}

	render() {
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
									<span className="t-item notes">{convertNotes(model.notes)}</span>
									<div className="clear-float"></div>
								</div>
							);
						})
					})()}
				</div>
			</div>
		);
	}
}

/**
 * Converts linebreaks to html with each line in its
 * own p element
 *
 * @private
 * @method convertNotes
 * @param str {string} the notes text
 * @return {string}
 */
const convertNotes = (str) => (
	str.split('\n').map((text, idx) =>
		<p key={idx}>{text}</p>
	)
);

// TrasactionList.propTypes = {

// };

export default TrasactionList;
