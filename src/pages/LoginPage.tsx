import { useState } from 'react';
import {login, User} from '../services/auth';
import {useNavigate} from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            const user_creds:User={email:email,password:password}
            await login(user_creds);
            navigate('/login');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                {error && <div>{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;