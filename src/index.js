
import React from 'react';
import ReactDOM from 'react-dom';
import { loadFireBase } from '@app/utils/fire-base';
import Auth from '@app/auth';
import App from './app';

// init firebase
loadFireBase();

ReactDOM.render((
		<Auth>
			<App />
		</Auth>
	),
	document.getElementById('application')
);
