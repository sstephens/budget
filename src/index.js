
import '@app/loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@app/auth';
import App from './app';

ReactDOM.render((
		<Auth>
			<App />
		</Auth>
	),
	document.getElementById('application')
);
