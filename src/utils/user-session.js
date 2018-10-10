
const AUTH_KEY = 'x-application-au';

/**
 * get the auth user from local storage
 *
 * @method getAuthUser
 * @return {object}
 */
export const getAuthUser = () => {
	// get auth user
	const authUser = localStorage.getItem(AUTH_KEY);

	if (authUser && authUser.length) {
		// auth user returned
		return Object.assign({}, { isAuthenticated: true }, JSON.parse(authUser));
	} else {
		// no auth returned
		return { isAuthenticated: false };
	}
};

/**
 * Clear the auth user from local storage
 *
 * @method clearAuthUser
 */
export const clearAuthUser = () => {
	localStorage.removeItem(AUTH_KEY);
};

/**
 * save the auth user to local storage
 *
 * @method setAuthUser
 * @param auth {object} the logged in user record
 */
export const setAuthUser = (auth) => {
	// store the auth user for the user session
	localStorage.setItem(AUTH_KEY, JSON.parse(auth));
};

