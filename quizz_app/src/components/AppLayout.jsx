import { Outlet } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import '../styles/SideNavbar.css';

const AppLayout = () => {
    return (
        <div className="app-layout">
            <SideNavbar />
            <main className="app-layout__content">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
