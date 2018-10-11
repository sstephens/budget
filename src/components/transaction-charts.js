/**
 * @module Components
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash/array';
import '@app/styles/components/transaction-charts.scss';
import { Pie } from 'react-chartjs-2';


/**
 * `TrasactionCharts`
 *
 * Renders a list of budget transactions into charts
 *
 * @class TrasactionCharts
 */
const TrasactionCharts = ({ models }) => {
	if (models && models.length) {
		// chart options to show the lengend right of the chart
		const opts = { legend: { display: true, position: 'right' } };

		return (
			<div className="c-transaction-charts active">
				<div className="left-chart">
					<Pie data={modifyData('title', models)} options={opts} redraw />
				</div>

				<div className="right-chart">
					<Pie data={modifyData('category', models)} options={opts} redraw />
				</div>

				<div className="clear-float"></div>
			</div>
		);
	} else {
		return <div className="c-transaction-charts"></div>;
	}
};

/**
 * convert data to chartjs data format
 *
 * allows a key to be passed in to represent
 * the labels property
 *
 * @method modifyData
 * @param key {string}
 * @param data {object}
 * @return {object}
 */
const modifyData = (key, data) => {
	const values = dataFor(key, data);
	return {
		labels: values.map(v => v.label),
		datasets: [{
			data: values.map(v => v.totalFixed),
			backgroundColor: [
				'rgba(30, 144, 255, .5)',
				'rgba(124, 252, 0, .5)',
				'rgba(255, 0, 0, .5)',
				'rgba(64, 224, 208, .5)',
				'rgba(255, 140, 0, .5)',
			],
			borderColor: [
				'rgba(30, 144, 255, 1)',
				'rgba(124, 252, 0, 1)',
				'rgba(255, 0, 0, 1)',
				'rgba(64, 224, 208, 1)',
				'rgba(255, 140, 0, 1)',
			],
			borderWidth: 1
		}]
	};
};

/**
 * aggregates and isolates the data props
 *
 * @method dataFor
 * @param key {string}
 * @param data {object[]}
 * @return {object[]}
 */
const dataFor = (key, data) => {
	return uniq(data.map(d => d[key])) // get all uniq labels for the key
		.map(label => { // aggregate and isolate props
			const amounts = data.filter(d => d[key] === label).map(d => d.amount);
			const total = amounts.reduce((a, b) => a + b, 0);
			return { label, total, totalFixed: total.toFixed(2) };
		})
		.sort((a, b) => a.total < b.total ? 1 : (b.total < a.total ? -1 : 0)) // sort data
		.slice(0, 5); // only return top five totals to keep the charts small
};

TrasactionCharts.propTypes = {
	models: PropTypes.array
};

export default TrasactionCharts;

