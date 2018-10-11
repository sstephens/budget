/**
 * @module utils
 *
 */

/**
 * Converts a documentReference from the firestore
 * into a json object
 *
 * @method normalizeDocref
 * @param doc {object[]} firestore doc ref
 * @param typeMap {object} object mapping props to types for conversion
 * @return {object[]}
 */
export default function normalizeDocref(doc, typeMap) {
	return doc.map(d => {
		// convert docref to json
		const json = d.data();

		// type map allows for props to be converted to
		// specifed types when the object is converted to json
		//
		// NOTE: the only supported types currently are [int, float]
		if (typeMap !== undefined && typeMap !== null) {
			let props = Object.keys(typeMap);
			if (props.length) {
				props.forEach(key => {
					if (json[key]) {
						const type = typeMap[key];
						if (type === 'int') {
							json[key] = parseInt(json[key], 10);
						} else if (type === 'float') {
							json[key] = parseFloat(json[key]);
						}
					}
				});
			}
		}

		// return json object
		return json;
	});
}
