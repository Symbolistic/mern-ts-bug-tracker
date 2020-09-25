import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

interface UnPrivateRouteInt {
	exact: boolean;
	path: string;
	component: any;
}

export const UnPrivateRoute: React.FC<UnPrivateRouteInt> = ({
	component: Component,
	...rest
}) => {
	const authContext = useAuthContext();

	return (
		<Route
			{...rest}
			render={(props) => {
				if (authContext.isAuthenticated)
					return (
						<Redirect to={{ pathname: '/', state: { from: props.location } }} />
					);

				return <Component {...props} />;
			}}
		/>
	);
};

export default UnPrivateRoute;
