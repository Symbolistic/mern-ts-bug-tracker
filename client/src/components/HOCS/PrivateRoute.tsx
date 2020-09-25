import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

interface PrivateRouteInt {
	exact: boolean;
	path: string;
	component: any;
	roles?: any;
}

export const PrivateRoute: React.FC<PrivateRouteInt> = ({
	component: Component,
	roles,
	...rest
}) => {
	const authContext = useAuthContext();

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!authContext.isAuthenticated)
					return (
						<Redirect
							to={{ pathname: '/login', state: { from: props.location } }}
						/>
					);

				return <Component {...props} />;
			}}
		/>
	);
};

export default PrivateRoute;
