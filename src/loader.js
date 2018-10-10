/**
 * @module loader
 *
 * creates a global services container
 *
 * Services are meant to be loaded once then injected
 * into other js class.
 *
 * This allows the services container to be created, so that each
 * services is preloaded and then can be reused.
 */
import firebase from '@app/services/firebase';

/**
 * simple method to make sure all services are stored on the
 * services container the same way.
 *
 * @method serviceInstance
 * @param initializer {function} a service initializer method
 * @return {object}
 */
const serviceInstance = (initializer) => {
	return { initializer, isInitialized: false, exports: null };
};

/**
 * Create the serrvice container and
 */
if (!window.__SERVICES__) {
	window.__SERVICES__ = {
		// Services must be added here after a new service
		// has been created
		firebase: serviceInstance(firebase)
	};
}
