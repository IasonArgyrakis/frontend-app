import React, { useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {backend} from "../services/data.service";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {IDepartmentValues, UserDepartmentProps} from "./AddDepartment";
import {IDepartment, IUser, useGlobalState} from "../state";
import EditDepartment from "./EditDepartment";


export function createDepartmentData(id: number,
                           title: string,) {
    return {id, title};

}


export default function Department(props:UserDepartmentProps){


    const nav = useNavigate();
    const [departments, updateDepartmentList] = useGlobalState('departments');
    useEffect(()=>{console.log(departments)},[...departments])

    let {onUpdate} = props;




    return (
        <Card variant="outlined">
            <CardContent className='ma-2'>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="left">Department Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments &&
                                departments.map(department => {

                                    return (
                                        <TableRow
                                            key={department.id}
                                        >
                                            <TableCell component="th" scope="row">
                                                {department.id}
                                            </TableCell>
                                            <TableCell align="left">
                                             <EditDepartment onUpdate={onUpdate} department={department}></EditDepartment>
                                            </TableCell>

                                        </TableRow>

                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );

}