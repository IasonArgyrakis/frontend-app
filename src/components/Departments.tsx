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
import {Button, Card, CardContent} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import AddDepartment, {IDepartmentValues, UserDepartmentProps} from "./AddDepartment";
import {IDepartment, IUser, useGlobalState} from "../state";
import EditDepartment from "./EditDepartment";


export function createDepartmentData(id: number,
                                     title: string,) {
    return {id, title};

}


export interface UserDepartmentsProps {


}

export default function Department() {


    const [departments, updateDepartmentList_G] = useGlobalState('departments');

    const [departments_l, updateDepartmentList_L] = useState(departments);

    const nav = useNavigate();
    useEffect(() => {
        console.log('mounted')


        console.log("update")
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            const departmentsList = data.map((user: { id: number; title: string; }) => {
                return createDepartmentData(user.id, user.title);
            });
            updateDepartmentList_G(departmentsList)
            updateDepartmentList_L(departmentsList)


        }).catch(() => {
            nav('/login')
        })
    }, [])

    const updateList = () => {
        console.log("dsda")
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            const departmentsList = data.map((user: { id: number; title: string; }) => {
                return createDepartmentData(user.id, user.title);
            });
            updateDepartmentList_G(departmentsList)
            updateDepartmentList_L(departmentsList)


        }).catch(() => {
            nav('/login')
        })
    }


    return (
        <div>
            <AddDepartment onUpdate={updateList}></AddDepartment>
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
                                {departments_l.length &&
                                    departments_l.map((department, index) => {

                                        return (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {department.id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <EditDepartment onUpdate={updateList}
                                                                    department={department}></EditDepartment>
                                                </TableCell>

                                            </TableRow>

                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    );

}