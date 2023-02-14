
import Departments, {createData} from "../components/departments";
import AddDepartment from "../components/AddDepartment";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {backend} from "../services/data.service";

const DepartmentPage = () => {

    const departmentList: any[]=[];
    const nav=useNavigate();
    const [departments, setDepartment] = useState({list:departmentList});




    useEffect(()=>{
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            const departmentListData=  data.map((user: { id: number; title: string;}) => {
                return createData(user.id, user.title);
            });
            setDepartment( {list:departmentListData})

        }).catch(()=>{
            nav('/login')
        })



    },[])


    return (
        <div>
            <h1>Departments</h1>
            <AddDepartment></AddDepartment>
            <Departments ></Departments>
        </div>
    );
};

export default DepartmentPage;