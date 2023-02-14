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
import {IUser, useGlobalState} from '../state';
import {Button} from "@mui/material";
import {UserDialog} from "./UserDialog";
import {UserDepartmentDialog} from "./UserDepartmentDialog";



export function createUserData(user:IUser) {
    return user;

}
export interface UserPageProps {

    onUpdate: (value: string) => void;

}


export default function Users() {
    const nav = useNavigate();
    const [users, updateUsers] = useGlobalState('users');
    const loadData = () => {
        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            let userListData: any[] = data.map((user: IUser) => {
                return user
            });
            console.log("eUsers")
            updateUsers(userListData)

        }).catch(() => {
            // nav('/login')
        })
    }


    useEffect(() => {

    loadData()

    }, [])

    const userState: IUser = {afm: "", email: "", firstName: "", id: 0, lastName: "",departments:[]}
    const [userEditOpen, OpenUserEdit] = React.useState(false);
    const [userDepartmentOpen, OpenUserDepartments] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(userState);


    const handleClose = (value: string) => {


        if("user"){
            OpenUserEdit(false);

        }
        if("userD"){
            OpenUserDepartments(false);

        }


        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            let userListData: any[] = data.map((user: IUser) => {
                return user
            });
            console.log(userListData)
            updateUsers(userListData)

        }).catch(() => {
           // nav('/login')
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
                    {users.length &&
                        users.map((user: IUser) => {

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
                                        <UserDialog
                                            user={selectedUser}
                                            open={userEditOpen}
                                            onClose={handleClose}/>


                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                            setSelectedUser(user)
                                            OpenUserDepartments(true);
                                        }}>
                                            Edit Departments
                                        </Button>

                                        <UserDepartmentDialog
                                            key={user.id}
                                            user={selectedUser}
                                            open={userDepartmentOpen}
                                            onClose={handleClose}/>

                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );

}