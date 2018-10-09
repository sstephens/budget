
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Converts linebreaks to html with each line in its own p tag.
 *
 * Strings without line breaks will result in the entire string
 * getting enclosed within a p tag.
 *
 * @public
 * @method SuperString
 * @param text {string} a string with or without line breaks
 * @return {Element[]}
 */
const SuperString = ({ text }) => (
	text.split('\n').map((str, idx) =>
		<p key={idx}>{str}</p>
	)
);

SuperString.propTypes = {
	text: PropTypes.string
};

export default SuperString;
