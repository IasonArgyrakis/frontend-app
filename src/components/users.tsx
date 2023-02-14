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
import EditDepartment from "./editUser";
import EditUser from "./editUser";



function createData(id: number,
                    firstName: string,
                    lastName: string,
                    afm: string,
                    email: string,) {
    return {id, firstName, lastName, afm, email};

}




export default  function  Users () {

    const nav=useNavigate();
    const [users, update] = useGlobalState('users');




    useEffect(()=>{
        backend.get({
           url: '/users',
           requiresToken: true
       }).then((data: any) => {
           let userListData:any[]=  data.map((user: IUser) => {
               return createData(user.id, user.firstName, user.lastName, user.afm, user.email);
           });
           update(userListData)

       }).catch(()=>{
            nav('/login')
        })



    },[])







        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>AFM</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length &&
                            users.map(user=> {

                                return (
                                    <TableRow
                                        key={user.id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                     <EditUser user={user} ></EditUser>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        );

}