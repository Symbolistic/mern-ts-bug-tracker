import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOCS/PrivateRoute';
import UnPrivateRoute from './components/HOCS/UnPrivateRoute';
import { Login } from './components/LoginRegister/Login';
import { Register } from './components/LoginRegister/Register';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MyProjects } from './components/MyProjects/MyProjects';
import { MyTickets } from './components/MyTickets/MyTickets';

function App() {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path='/' component={Dashboard} />
				<PrivateRoute exact path='/myprojects' component={MyProjects} />
				<PrivateRoute exact path='/mytickets' component={MyTickets} />
				<UnPrivateRoute exact path='/login' component={Login} />
				<UnPrivateRoute exact path='/register' component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
