
import Users, {UserPageProps} from "../components/Users";
import AddUser from "../components/AddUser";
import {useNavigate} from "react-router-dom";
import {IUser, useGlobalState} from "../state";
import {backend} from "../services/data.service";
import {useEffect, useState} from "react";

const UserPage = () => {


    const departmentList: any[] = [];
    const nav = useNavigate();
    const [users, updateUsers] = useGlobalState('users');
    const [usersLocal, usersLocal_] = useState<IUser[]>(users);


    const loadData = () => {
        console.log("Load")
        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            let userListData: any[] = data.map((user: IUser) => {
                return user
            });

            updateUsers(userListData)
            usersLocal_(userListData)

        }).catch(() => {
            // nav('/login')
        })
    }
    useEffect(() => {
        console.log("Load")
        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            let userListData: any[] = data.map((user: IUser) => {
                return user
            });

            updateUsers(userListData)
            usersLocal_(userListData)

        }).catch(() => {
            // nav('/login')
        })


    }, [])
    return (
        <div>
            <h1>Users</h1>
            <AddUser onUpdate={loadData}></AddUser>
            <Users></Users>
        </div>
    );
};

export default UserPage;