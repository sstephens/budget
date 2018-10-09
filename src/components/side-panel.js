
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@app/styles/components/side-panel.scss';

class SidePanel extends Component {
	constructor() {
		super();

		this.form = React.createRef();
	}

	outsideClick(evt) {
		// exit click listener if d-button is clicked
		if (evt.target.className.match('d-button') !== null) {
			return;
		}

		if (!isClickInsideContainer(evt.target, 'panel-container')) {
			// call onClose event to notify parent of SidePanel closure
			this.close();
		} else {
			// rebind handler if the click was inside the SidePanel
			this.bindHandler();
		}
	}

	close() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	saveBudget() {
		const container = this.form.current;
		if (!container) {
			throw new Error("saveBudget failed to get the form container ref");
		}

		const elName = container.querySelector('.bf-name');
		const elCategory = container.querySelector('.bf-category');
		const elAmount = container.querySelector('.bf-amount');
		const elNotes = container.querySelector('.bf-notes');

		const data = {
			title: elName.value.trim(),
			category: elCategory.value.trim(),
			amount: elAmount.value.trim(),
			notes: elNotes.value.trim()
		};

		window.console.log(data);
		// TODO:
		// Send data to api
	}

	render() {
		// bind a click event to the document to listen and close the
		// slide menu when a click is detected off the menu
		if (this.props.isShowing) {
			const handler = (event) => this.outsideClick(event);
			document.addEventListener('click', handler, { capture: true, once: true });
		}

		// dynamic class name to hide and show side pannel
		const showClass = `panel-slider ${(this.props.isShowing ? 'show' : '')}`;

		return (
			<div className="c-side-panel">
				<div className={showClass}>
					<div className="panel-container">
						<div className="budget-title">Add Exspense</div>

						<div className="budget-form" ref={this.form}>
							<div className="form-item">
								<label>Title</label>
								<input className="bf-name" type="text" />
							</div>

							<div className="form-item">
								<label>Category</label>
								<input className="bf-category" type="text" />
							</div>

							<div className="form-item">
								<label>Amount</label>
								<input className="bf-amount" type="text" />
							</div>


							<div className="form-item">
								<label>Notes</label>
								<textarea className="bf-notes"></textarea>
							</div>
						</div>

						<div className="button-container">
							<button className="d-button grey" onClick={() => this.close()}>Close</button>
							<button className="d-button blue close-button" onClick={(event) => this.saveBudget(event)}>Save</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SidePanel.propTypes = {
	isShowing: PropTypes.bool,
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

export default SidePanel;
