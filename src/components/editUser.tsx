import React, {useState} from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {useNavigate} from "react-router-dom";
import {backend} from "../services/data.service";
import {IDepartment, IUser, useGlobalState} from "../state";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


const EditDepartment = (props: { user: IUser }) => {
    const {user} = props


    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        backend.put({
            url: '/users',
            payload: values,
        })
            .then((data) => {

            }).catch((errors) => {
            console.log(errors)
            setErrors({
                title: errors.message
            })
        })


    }

    const deleteUser = (e: any) => {
        const id = e.target.value
        backend.delete({
            url: '/departments',
            payload: {id: id},
            requiresToken: true
        })
    }


    return (
        <div>
            <Formik
                initialValues={{
                    ...user
                }}
                validate={(values) => {
                    const errors: Partial<IUser> = {};
                    if (values.email === "") {
                        errors.email = 'Required';
                    }
                    if (values.afm === "") {
                        errors.afm = 'Required';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (

                    <Form>

                        <TableRow
                            key={user.id}
                        >
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="right"> <Field

                                component={TextField}
                                name="firstname"
                                type="text"
                                variant="outlined"


                            /></TableCell>
                            <TableCell align="right">{user.lastName}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.afm}</TableCell>
                            <TableCell align="right">{user.afm}</TableCell>
                            <TableCell align="right">
                                <Button
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Update User Info
                                </Button></TableCell>
                            <TableCell align="right"> <Button color="warning"
                                                              style={{
                                                                  marginLeft: "10px"
                                                              }}

                                                              value={user.id}
                                                              onClick={deleteUser}> Delete</Button></TableCell>
                        </TableRow>


                    </Form>


                )}
            </Formik>

        </div>
    );
};

export default EditDepartment;