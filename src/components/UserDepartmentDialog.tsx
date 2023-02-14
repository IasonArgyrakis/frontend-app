import * as React from 'react';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


import {backend} from "../services/data.service";
import {IDepartment, IUser, reducerUsers, useGlobalState} from "../state";
import {useEffect} from "react";
import {createData} from "./departments";
import {useNavigate} from "react-router-dom";
import {Checkbox} from "@mui/material";
import {createUserData} from "./users";


export interface UserDepartmentDialogProps {
    open: boolean;
    user: IUser;
    onClose: (value: string) => void;

}

export function UserDepartmentDialog(props: UserDepartmentDialogProps) {
    const nav = useNavigate();
    let {user, open, onClose} = props;
    const [users, updateUsers] = useGlobalState('users');
    const [departments, updateDepartmentList] = useGlobalState('departments');


    useEffect(() => {
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            let departmentsListData: any[] = data.map((departments: IDepartment) => {
                return createData(departments.id, departments.title);
            });
            updateDepartmentList(departmentsListData)

        }).catch(() => {

        })


    }, [])

    const closeModal = () => {
        onClose('userD')
    }


    const ManageUser = (e: any) => {

        const userUpdate = {
            url: `/departments/${e.target.value}/user/${user.id}`,
            requiresToken: true
        }

        const index = user.departments.findIndex((item) => item.id === parseInt(e.target.value))
        console.log(index=== -1)
        if (index === -1) {

            backend.put(userUpdate).then((success) => {

            })
        } else {
            backend.delete(userUpdate).then((success) => {
                console.log("del")
            })

        }


    }


    const fieldStyle = {
        padding: "10px"
    }


    return (
        <Dialog onClose={closeModal} open={open}>
            <DialogTitle>Update user Info</DialogTitle>
            <div style={fieldStyle}>

                {departments.map((department) => {
                        const isInDepartment = user.departments.find((entry) => entry?.id === department.id)


                        return (
                            <div>
                                <Checkbox
                                    checked={isInDepartment}
                                    value={department.id}
                                    onChange={ManageUser}
                                    defaultChecked={false}

                                />
                                {department.title}
                                <br/>
                            </div>)
                    }
                )}

                <Button

                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                >
                    Finished
                </Button>
            </div>

        </Dialog>
    );
}

