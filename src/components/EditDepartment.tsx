import React, {useState} from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {useNavigate} from "react-router-dom";
import {backend} from "../services/data.service";
import {IDepartment, useGlobalState} from "../state";



export interface IDepartmentValues {
    title: string;
}


const EditDepartment = (props:{department:IDepartment, onUpdate: (value: string) => void}) => {
    const {department,onUpdate}=props


    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        backend.put({
            url: '/departments',
            payload: values,
        })
        .then((data)=>{

        }).catch((errors) => {
            console.log(errors)
            setErrors({
               ...errors
            })
        })


    }

    const deleteDepartment = (e: any) => {
        const id=e.target.value
        backend.delete({
            url: '/departments',
            payload: {id: id},
            requiresToken: true
        }).then(()=>onUpdate(""))
    }



    return (
        <div>
            <Formik
                initialValues={{
                    id:department.id,
                    title: department.title,

                }}
                validate={(values) => {
                    const errors: Partial<IDepartmentValues> = {};
                    if (values.title==="") {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (

                            <Form >

                                    <Field

                                        component={TextField}
                                        name="title"
                                        type="text"
                                        variant="outlined"


                                    />
                                <Button
                                    style={{
                                    marginLeft:"10px"
                                    }}
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Update Name
                                </Button>

                                <Button color="warning"
                                        style={{
                                            marginLeft:"10px"
                                        }}

                                        value={department.id}
                                        onClick={deleteDepartment}> Delete</Button>

                            </Form>


                )}
            </Formik>

        </div>
    );
};

export default EditDepartment;