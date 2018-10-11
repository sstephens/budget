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
	render() {
		if (this.props.models && this.props.models.length) {
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
							return this.props.models.map((docRef, idx) => {
								const model = docRef.data();
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
