
import Users from "../components/Users";
import AddUser from "../components/AddUser";
import {useNavigate} from "react-router-dom";
import {IUser, useGlobalState} from "../state";
import {backend} from "../services/data.service";
import {useEffect} from "react";

const UserPage = () => {

    const departmentList: any[] = [];
    const nav = useNavigate();
    const [users, updateUsers] = useGlobalState('users');



    useEffect(() => {

        const loadData = () => {
            backend.get({
                url: '/users',
                requiresToken: true
            }).then((data: any) => {
                let userListData: any[] = data.map((user: IUser) => {
                    return user
                });
                console.log("UserPage")
                updateUsers(userListData)

            }).catch(() => {
                // nav('/login')
            })
        }

    }, [])
    return (
        <div>
            <h1>Users</h1>
            <AddUser></AddUser>
            <Users ></Users>
        </div>
    );
};

export default UserPage;