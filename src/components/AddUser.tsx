import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {backend} from "../services/data.service";
import {IUser} from "../state";
import {UserDepartmentProps} from "./AddDepartment";


export interface IUserValues {
    firstName: string;
    lastName: string;
    password: string
    afm: string;
    email: string;
}


const AddUser = (props:UserDepartmentProps) => {
    let {onUpdate} = props;

    const submit = (values: any, {setSubmitting, setErrors}: any) => {
        setSubmitting(false);
        backend.post({
            url: '/users',
            payload: values,
            requiresToken:true

        })
            .then((data) => {      onUpdate("list/2")

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
                    firstName: "",
                    lastName: "",
                    afm: "",
                    email: "",
                    password: "password"

                }}
                validate={(values) => {
                    const errors: Partial<IUserValues> = {};
                    console.log(values)
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.afm) {
                        errors.afm = 'Required';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (
                    <Card variant="outlined">
                        <CardContent className='pa-2'>
                            <Form>
                                <h1>Add User</h1>

                                <Field

                                    component={TextField}
                                    name="firstName"
                                    label="firstName"
                                    type="text"

                                />

                                <Field

                                    component={TextField}
                                    name="lastName"
                                    label="lastName"
                                    type="text"

                                />

                                <Field

                                    component={TextField}
                                    name="email"
                                    label="email"
                                    type="email"

                                />

                                <Field

                                    component={TextField}
                                    name="afm"
                                    label="AFM"
                                    type="email"

                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>

                            </Form>
                        </CardContent>
                    </Card>

                )}
            </Formik>
        </div>
    );
};

export default AddUser;