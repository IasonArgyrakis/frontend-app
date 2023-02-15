import * as React from 'react';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


import {backend} from "../services/data.service";
import {IDepartment, IUser, reducerUsers, useGlobalState} from "../state";
import {useEffect, useState} from "react";
import {createDepartmentData} from "./Departments";
import {useNavigate} from "react-router-dom";
import {Checkbox} from "@mui/material";
import {createUserData} from "./Users";


export interface UserDepartmentDialogProps {
    open: boolean;
    user: IUser;
    onClose: (value: string) => void;

}

export function UserDepartmentDialog(props: UserDepartmentDialogProps) {
    let {user, open, onClose} = props;
    const [departments, updateDepartmentList] = useGlobalState('departments');
    const [userState, userStateUpdate] = useState(user)

    const handleCheck = (department: { id: any; checked: any; index:  number; }) => {


        const userUpdate = {
            url: `/departments/${userCheckboxes[department.index].id}/user/${userState.id}`,
            requiresToken: true
        }
        console.log(userCheckboxes[department.index].checked)
        if (userCheckboxes[department.index].checked===false) {
            userCheckboxes[department.index].checked=true

            backend.put(userUpdate).then(()=>{
                userCheckboxes_([...userCheckboxes])
            })

        }else  if (userCheckboxes[department.index].checked===true) {
            userCheckboxes[department.index].checked=false

            backend.delete(userUpdate).then(()=>{
                userCheckboxes_([...userCheckboxes])
            }).catch(()=>{

            })
        }
    };
    const makeCheckBoxes = () => {
        let new_departments: any[];
        new_departments = [];
        console.log(user.departments)
        departments.map((department,index) => {
            let isInDepartment = (userState.departments?.findIndex((entry) => entry.id === department.id) >= 0);
            new_departments.push({index:index,id: department.id, title: department.title, checked: isInDepartment})
        })
        console.log(new_departments)
        return new_departments


    }
    const [userCheckboxes, userCheckboxes_] = useState(makeCheckBoxes)



    const update = () => {
        let new_departments: any[];
        new_departments = [];
        console.log(user.departments)
        departments.map((department,index) => {
            let isInDepartment = (userState.departments?.findIndex((entry) => entry.id === department.id) >= 0);
            new_departments.push({index:index,id: department.id, title: department.title, checked: isInDepartment})
        })
        console.log(new_departments)
        return new_departments


    }


    const closeModal = () => {

        onClose('userD')
    }
    useEffect(() => {
        console.log("refresh")
    }, [departments,user])







    const fieldStyle = {
        padding: "10px"
    }


    return (
        <Dialog onClose={closeModal} open={open}>
            <DialogTitle>Update user Info</DialogTitle>
            <div style={fieldStyle}>

                {userCheckboxes.map((department,index) => {


                        return (
                            <div key={index}>
                                <Checkbox
                                    checked={department.checked}
                                    value={department.id}
                                    onClick={()=>handleCheck(userCheckboxes[department.index])}
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

