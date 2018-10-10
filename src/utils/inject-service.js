/**
 * @module Services
 *
 */
export default function injectService(name) {
	if (!window.__SERVICES__[name]) {
		throw new Error("Service does not exist");
	}

	const service = window.__SERVICES__[name];
	if (!service.isInitialized) {
		service.isInitialized = true;
		service.exports = service.initializer();
	}
	return service.exports;
}
