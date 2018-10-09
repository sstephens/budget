/**
 * @module Utils
 *
 */
import fetch from 'node-fetch';

// define api host url
const apiHost = 'localhost:4400';

/**
 * create a url from the type and the apiHost defined above
 *
 * @method createURL
 * @param type {string}
 * @return {string}
 */
const createURL = (type) => {
	return `${apiHost}/${type}`;
};

/**
 * convert a query object to a querystring
 *
 * @method createQueryParams
 * @param query {object}
 * @return {string}
 */
const createQueryParams = (query) => {
	let queryStr = '';
	Object.keys(query).forEach(key => {
		let value = query[key];
		if (value !== undefined) {
			if (Array.isArray(value)) {
				value.forEach(val => queryStr += `&${key}[]=${val}`);
			} else if (value !== null && typeof value === 'object') {
				let subStr = this.stringify(value);
				queryStr += '&' + subStr.replace(/^([^=]*)/, key + '[$1]').replace(/&([^=]*)/g, '&' + key + '[$1]');
			} else {
				if (value === null) {
					value = '';
				}
				queryStr += `&${key}=${value}`;
			}
		}
	});
	return queryStr.replace(/^&/, '');
};

/**
 * concat the url to the queryparams
 *
 * @method addQueryParams
 * @param url {string}
 * @param query {string}
 * @return {string}
 */
const addQueryParams = (url, query) => {
	return `${url}?${createQueryParams(query)}`;
};

/**
 * query data from the api
 *
 * @method query
 * @param type {string}
 * @param query {object}
 * @return {Promise}
 */
export const query = (type, query) => {
	// create url
	const url = addQueryParams(createURL(type), query);

	// fetch data
	return fetch(url).then(res => res.json());
};

/**
 * send data to the api
 *
 * @method post
 * @param type {string}
 * @param data {object}
 * @return {Promise}
 */
export const post = (type, data={}) => {
	// create url
	const url = createURL(type);

	// create options object
	const opts = {
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
		method: 'POST',
		body: JSON.stringify(data)
	};

	// send post fetch request
	return fetch(url, opts).then(res => res.json());
};

