import { useEffect, useState } from 'react';
import {backend} from "../services/data.service";

const DashboardPage = () => {
    const [data, setData] = useState('');

    const fetchData = async () => {
        const response =  await backend.get({
            url:'/users',
            requiresToken:true

        })
        console.log(response)
    };

    useEffect(() => {
       fetchData()
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{data.toString()}</p>
        </div>
    );
};

export default DashboardPage;