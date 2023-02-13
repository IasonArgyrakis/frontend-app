import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {backend} from "../services/data.service";
import {array} from "yup";



function createData(
    id: number,
    firstName: string,
    lastName: string,
    afm:string,
    email:string,
) {
    return { id, firstName,lastName,afm,email };
}


let userRows: any[] = [
  ];

backend.get({
    url:'/users',
    requiresToken:true

}).then((data:any)=>{
    console.log(data)
    userRows=data
    console.log(userRows)
    userRows.map((user:any)=>{createData(user.id,user.firstName,user.lastName,user.afm,user.email)})
})


export default function Users() {



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell >First Name</TableCell>
                        <TableCell >Last Name</TableCell>
                        <TableCell >AFM</TableCell>
                        <TableCell >Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userRows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.lastName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.afm}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}