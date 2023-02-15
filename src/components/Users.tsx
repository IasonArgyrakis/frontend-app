import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {backend} from "../services/data.service";
import {useNavigate} from "react-router-dom";
import {IDepartment, IUser, reducerUsers, useGlobalState} from '../state';
import {Button} from "@mui/material";
import {UserDialog} from "./UserDialog";
import {UserDepartmentDialog} from "./UserDepartmentDialog";


export function createUserData(user: IUser) {
    return user;

}

export interface UserPageProps {

    users: IUser[]

}


export default function Users() {
    const nav = useNavigate();
    const [departments, departments_] = useGlobalState("departments");
    const [localUsers, localUsers_] = useGlobalState("users");
    const [userEditOpen, OpenUserEdit] = useState(false);
    const [userDepartmentOpen, OpenUserDepartments] = useState(false);
    let [selectedUser, setSelectedUser] = useState<IUser>({
        afm: "",
        email: "",
        firstName: "",
        id: 0,
        lastName: "", departments: [],
        password: ""
    });

    useEffect(() => {
        console.log(departments)
    }, [departments])


    const handleClose = (value: string) => {
        console.log(value)
        OpenUserDepartments(false);
        OpenUserEdit(false);
        setSelectedUser({
            afm: "",
            email: "",
            firstName: "",
            id: 0,
            lastName: "",
            password: "",
            departments: [],
        })
        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            let departmentsListData:any[]=  data.map((department: IDepartment) => {
                return department
            });
            localUsers_(departmentsListData)

        }).catch(()=>{
            nav('/login')
        })

    };


    const deleteUser = (user: IUser) => {
        backend.delete({
            url: "/users",
            payload: user,
            requiresToken: true
        })
        reducerUsers(localUsers, {type: "remove", user: user})
        setSelectedUser({
            afm: "",
            email: "",
            firstName: "",
            id: 0,
            lastName: "",
            password: "",
            departments: [],
        })

    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>AFM</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {localUsers.length &&
                        localUsers.map((user: IUser) => {

                            return (
                                <TableRow
                                    key={user.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="right">{user.firstName}</TableCell>
                                    <TableCell align="right">{user.lastName}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.afm}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={() => {
                                            setSelectedUser(user)
                                            OpenUserEdit(true);
                                        }}>
                                            Edit
                                        </Button>
                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                            deleteUser(user)
                                        }}>
                                            Delete
                                        </Button>
                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                            setSelectedUser(user)
                                            OpenUserDepartments(true);
                                        }}>
                                            Edit Departments
                                        </Button>
                                        { (selectedUser) &&

                                            <UserDialog
                                                user={selectedUser}
                                                open={userEditOpen}
                                                onClose={handleClose}/>
                                        }


                                        { (userDepartmentOpen) &&

                                            <UserDepartmentDialog
                                                key={user.id}
                                                user={selectedUser}
                                                open={userDepartmentOpen}
                                                onClose={handleClose}/>}

                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );

}