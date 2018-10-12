/**
 * @module Components
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectService from '@app/utils/inject-service';
import '@app/styles/components/add-transaction.scss';

/**
 * `AddTransaction`
 *
 * add transaction component
 *
 * @class AddTransaction
 */
class AddTransaction extends Component {
	constructor() {
		super();

		this.firebase = injectService('firebase');

		// create ref for form element
		this.form = React.createRef();
	}

	componentDidMount() {
		// load user ref
		this.user = this.firebase.auth.currentUser;
	}

	/**
	 * triggered by the event listener to close the side panel
	 * when a click is detected off of the side panel
	 *
	 * @method outsideClick
	 */
	outsideClick(evt) {
		// exit click listener if d-button is clicked
		if (evt.target.className.match('d-button') !== null) {
			return;
		}

		if (!isClickInsideContainer(evt.target, 'panel-container')) {
			// call onClose event to notify parent of AddTransaction closure
			this.close();
		} else {
			// rebind handler if the click was inside the AddTransaction
			this.bindHandler();
		}
	}

	/**
	 * notify parents of a close event on the side panel
	 *
	 * @method close
	 */
	close() {
		// call onClose if it was provided by the parent
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	/**
	 * Save a budget model to the database
	 *
	 * @method saveBudget
	 */
	saveBudget() {
		if (this.isSaving) {
			return;
		}

		this.isSaving = true;

		// get form container
		const container = this.form.current;

		// throw error if no form container was found
		if (!container) {
			throw new Error("saveBudget failed to get the form container ref");
		}

		// get input elements
		const elName = container.querySelector('.bf-name');
		const elCategory = container.querySelector('.bf-category');
		const elAmount = container.querySelector('.bf-amount');
		const elNotes = container.querySelector('.bf-notes');

		// get input data
		const data = {
			userid: this.user.uid,
			personal: true,
			title: elName.value.trim(),
			category: elCategory.value.trim(),
			amount: parseFloat(elAmount.value.trim().replace(/^\$$/, '')),
			notes: elNotes.value.trim()
		};

		if (isNaN(data.amount)) {
			data.amount = 0;
		}

		this.firebase.db
			.collection('transaction').add(data)
			.then(ref => {
				elName.value = '';
				elCategory.value = '';
				elAmount.value = '';
				elNotes.value = '';
				this.isSaving = false;
				return this.afterSave(ref);
			})
			.catch(error => window.console.log('Error: ', error));
	}

	afterSave() {
		if (this.props.onSave) {
			this.props.onSave();
		}

		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	bindHandler() {
		document.addEventListener(
			'click',
			(event) => this.outsideClick(event),
			{ capture: true, once: true }
		);
	}

	shouldSubmit(evt) {
		const isTextArea = evt.target.tagName === 'TEXTAREA';
		if ((isTextArea && evt.ctrlKey) && evt.keyCode === 13) {
			this.saveBudget(evt);
		}
	}

	render() {
		// bind a click event to the document to listen and close the
		// slide menu when a click is detected off the menu
		if (this.props.isShowing) {
			this.bindHandler();
		}

		// dynamic class name to hide and show side pannel
		const showClass = `panel-slider ${(this.props.isShowing ? 'show' : '')}`;

		return (
			<div className="c-add-transaction">
				<div className={showClass}>
					<div className="panel-container">
						<div className="budget-title">Add Exspense</div>

						<div className="budget-form" ref={this.form} onKeyUp={(event) => this.shouldSubmit(event)}>
							<div className="form-item">
								<label>Title</label>
								<input className="bf-name" type="text" placeholder="Amazon, WalMart..."/>
							</div>

							<div className="form-item">
								<label>Category</label>
								<input className="bf-category" type="text" placeholder="Gas, Groceries..."/>
							</div>

							<div className="form-item currency">
								<label>Amount</label>
								<span>$</span>
								<input className="bf-amount" type="text" placeholder="0.00"/>
							</div>


							<div className="form-item">
								<label>Notes</label>
								<textarea className="bf-notes"></textarea>
							</div>
						</div>

						<div className="button-container">
							<button className="d-button blue close-button" onClick={(event) => this.saveBudget(event)}>Save</button>
							<button className="d-button grey" onClick={() => this.close()}>Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddTransaction.propTypes = {
	isShowing: PropTypes.bool,
	onSave: PropTypes.func,
	onClose: PropTypes.func
};

/**
 * Recursively checks the elements up the node tree to see if the
 * click was inside an element of the containerName
 *
 * @private
 * @method isClickInsideContainer
 * @param element {DOMElement} element that was clicked
 * @param containerName {string} name of the container class to search the DOM tree for
 * @return {boolean}
 */
const isClickInsideContainer = (element, containerName) => {
	// return false if we have trversed the DOM tree up to the <body> or <html> tags
	if (!element || ["BODY", "HTML"].indexOf(element.tagName) !== -1) return false;

	// return true if the containerName is a match for the className of the element
	if (element.className.match(containerName) !== null) return true;

	// recurse until one of the above cases is a match
	return isClickInsideContainer(element.parentNode, containerName);
};

export default AddTransaction;
