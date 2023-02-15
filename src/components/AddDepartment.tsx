import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';

import {backend} from "../services/data.service";
import {IDepartment, useGlobalState} from "../state";


export interface IDepartmentValues {
    title: string;
}

export interface UserDepartmentProps {

    onUpdate: (value: string) => void;

}

const AddDepartment = (props: UserDepartmentProps) => {

    const [departments, departments_] = useGlobalState('departments');

    let {onUpdate} = props;


    const submit = (values: any, {setSubmitting, setErrors}: any) => {
        console.log(departments)
        setSubmitting(false);
        backend.post({
            url: '/departments',
            payload: values,
        })
            .then((data:any) => {
                departments.push(data)
                departments_(departments)
            }).catch((errors) => {
            console.log(errors)
            setErrors(
                errors
            )
        })


    }

    return (
        <div>
            <Formik
                initialValues={{
                    title: "",

                }}
                validate={(values) => {
                    const errors: Partial<IDepartmentValues> = {};
                    if (values.title === "") {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (
                    <Card variant="outlined">
                        <CardContent className='pa-2'>
                            <Form>
                                <h1>Add Department</h1>
                                <div>
                                    <Field

                                        component={TextField}
                                        name="title"
                                        label="Title"
                                        type="text"

                                    />
                                </div>
                                <div className='pa-2'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>

                )}
            </Formik>
        </div>
    );
};

export default AddDepartment;