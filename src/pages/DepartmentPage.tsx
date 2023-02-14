import Departments, {createDepartmentData} from "../components/departments";
import AddDepartment from "../components/AddDepartment";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {backend} from "../services/data.service";
import {useGlobalState} from "../state";

const DepartmentPage = () => {

    const departmentList: any[] = [];
    const nav = useNavigate();
    const [departments, updateDepartmentList] = useGlobalState('departments');

    const updateList=()=>{
        console.log("list")
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            const departmentsList = data.map((user: { id: number; title: string; }) => {
                return createDepartmentData(user.id, user.title);
            });
            updateDepartmentList(departmentsList)

        }).catch(() => {
            nav('/login')
        })
    }


    useEffect(() => {

        updateList()

    }, [])


    return (
        <div>
            <h1>Departments</h1>
            <AddDepartment onUpdate={updateList}></AddDepartment>
            <Departments onUpdate={updateList}></Departments>
        </div>
    );
};

export default DepartmentPage;