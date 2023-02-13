import { useEffect, useState } from 'react';
import {backend} from "../services/data.service";
import Users from "../components/users";

const DashboardPage = () => {
    const [users, setUsers] = useState([]);



    const fetchData = async () => {



    };


    return (
        <div>
            <h1>Dashboard</h1>
            <Users ></Users>
        </div>
    );
};

export default DashboardPage;