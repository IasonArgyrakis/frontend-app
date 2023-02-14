import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import {blue} from '@mui/material/colors';
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {register} from "../services/auth";
import {backend} from "../services/data.service";
import {IUser, reducerUsers, useGlobalState} from "../state";
import {useState} from "react";

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface UserDialogProps {
    open: boolean;
    user: IUser;
    onClose: (value: string) => void;

}

export function UserDialog(props: UserDialogProps) {
    let {user, open, onClose} = props;
    const [dialogStateLocal, closeDialog] = React.useState(open);
    const [users, updateList] = useGlobalState('users');



    const handleClose = () => {
        onClose("");
    };

    const handleListItemClick = (value: string) => {

    };

    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        delete values.departments
        backend.put({
            url: '/users',
            payload: values,
            requiresToken: true
        })
            .then((data) => {

                    updateList(reducerUsers(users,
                        {
                            type: "update",
                            user: values
                        }
                    ))
                    handleClose()

                }
            ).catch((errors) => {
            setErrors({
                ...errors
            })

        })


    }

    const fieldStyle = {
        padding: "10px"
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Update user Info</DialogTitle>
            <Formik
                initialValues={{
                    ...user
                }}
                validate={(values) => {

                    const errors: Partial<IUser> = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (
                    <Form style={{
                        padding: "10px"
                    }}>
                        <div
                            style={fieldStyle}>
                            <Field

                                component={TextField}
                                name="email"
                                type="email"
                                label="Email"
                            />
                        </div>

                        <br/>


                        <div
                            style={fieldStyle}>
                            <Field
                                component={TextField}
                                type="text"
                                name="firstName"
                                label="First Name"
                            />
                        </div>
                        <br/>

                        <div
                            style={fieldStyle}>
                            <Field
                                component={TextField}
                                type="text"
                                label="lastName"
                                name="lastName"
                            />
                        </div>
                        <br/>

                        <div
                            style={fieldStyle}>
                            <Field
                                component={TextField}
                                type="text"
                                label="afm"
                                name="afm"
                            />
                        </div>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>

        </Dialog>
    );
}

