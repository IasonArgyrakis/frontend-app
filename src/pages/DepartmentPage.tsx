import Departments, {createDepartmentData} from "../components/Departments";
import AddDepartment from "../components/AddDepartment";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {backend} from "../services/data.service";
import {IDepartment, useGlobalState} from "../state";

const DepartmentPage = () => {





    return (
        <div>
            <h1>Departments</h1>

            <Departments ></Departments>
        </div>
    );
};

export default DepartmentPage;