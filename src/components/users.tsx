import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {backend} from "../services/data.service";



function createData(id: number,
                    firstName: string,
                    lastName: string,
                    afm: string,
                    email: string,) {
    return {id, firstName, lastName, afm, email};

}




export default  function  Users () {
    const userList: any[]=[];
    const [users, setUsers] = useState({list:userList});




    useEffect(()=>{
        backend.get({
           url: '/users',
           requiresToken: true
       }).then((data: any) => {
           const userListData=  data.map((user: { id: number; firstName: string; lastName: string; afm: string; email: string; }) => {
               return createData(user.id, user.firstName, user.lastName, user.afm, user.email);
           });
           setUsers( {list:userListData})

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.list.length &&
                            users.list.map(user => {
                              console.log(user)
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
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        );

}