import React, {ReactNode} from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from "../service/AuthContext";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}: PrivateRouteProps) => {
    const {userIsAuthenticated} = useAuth();

    return userIsAuthenticated()
        ? (<>{children}</>)
        : (<Navigate to="/login" replace={true}/>);
};

export default PrivateRoute;