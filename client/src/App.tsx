import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOCS/PrivateRoute';
import UnPrivateRoute from './components/HOCS/UnPrivateRoute';
import { Login } from './components/LoginRegister/Login';
import { Register } from './components/LoginRegister/Register';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ManageProjectUsers } from './components/ManageProjectUsers/ManageProjectUsers';
import { MyProjects } from './components/MyProjects/MyProjects';
import { AddProject } from './components/AddProject/AddProject';
import { EditProject } from './components/EditProject/EditProject';
import { ProjectDetails } from './components/ProjectDetails/ProjectDetails';
import { MyTickets } from './components/MyTickets/MyTickets';
import { AddTicket } from './components/AddTicket/AddTicket';
import { EditTicket } from './components/EditTicket/EditTicket';
import { TicketDetails } from './components/TicketDetails/TicketDetails';

function App() {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path='/' component={Dashboard} />
				<PrivateRoute
					exact
					path='/manageprojectusers'
					component={ManageProjectUsers}
				/>
				<PrivateRoute exact path='/myprojects' component={MyProjects} />
				<PrivateRoute exact path='/addproject' component={AddProject} />
				<PrivateRoute exact path='/editproject' component={EditProject} />
				<PrivateRoute exact path='/projectdetails' component={ProjectDetails} />
				<PrivateRoute exact path='/mytickets' component={MyTickets} />
				<PrivateRoute exact path='/addticket' component={AddTicket} />
				<PrivateRoute exact path='/editticket' component={EditTicket} />
				<PrivateRoute exact path='/ticketdetails' component={TicketDetails} />
				<UnPrivateRoute exact path='/login' component={Login} />
				<UnPrivateRoute exact path='/register' component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
