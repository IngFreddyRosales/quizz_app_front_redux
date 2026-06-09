
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const token = useSelector((state) => state.auth.token);

    // Si no hay token en Redux (o se borró del localStorage), lo expulsa.
    // Si intenta pasar un token falso, Axios lanzará 401 en la primera petición 
    // y el interceptor que acabamos de hacer lo expulsará.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, renderiza la ruta hija
    return <Outlet />;
};

export default PrivateRoute;