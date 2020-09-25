import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.scss';
import { AuthProvider } from './components/Context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
