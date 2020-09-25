import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOCS/PrivateRoute';
import UnPrivateRoute from './components/HOCS/UnPrivateRoute';
import { Login } from './components/LoginRegister/Login';
import { Register } from './components/LoginRegister/Register';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path='/' component={Dashboard} />
				<UnPrivateRoute exact path='/login' component={Login} />
				<UnPrivateRoute exact path='/register' component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
