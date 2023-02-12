import { useEffect, useState } from 'react';
import {_axios as axios} from "../services/auth";
import { getToken } from '../services/auth';

const DashboardPage = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/users', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{data.toString()}</p>
        </div>
    );
};

export default DashboardPage;