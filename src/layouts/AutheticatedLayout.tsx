import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

type AuthenticatedLayoutProps = {
    children: ReactNode;
};

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    );
};

export default AuthenticatedLayout;