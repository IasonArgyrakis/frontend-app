import React from 'react';
import {Button, Card, CardContent} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {useNavigate} from "react-router-dom";
import {backend} from "../services/data.service";
import {useGlobalState} from "../state";



export interface IDepartmentValues {
    title: string;
}

const AddDepartment = () => {
    const nav=useNavigate();
    const [departments, update] = useGlobalState('departments');
    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        backend.post({
            url: '/departments',
            payload: values,
        })
        .then((data)=>{


        }).catch((errors) => {
            console.log(errors)
            setErrors({
                title:errors
            })
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
                    if (values.title==="") {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({submitForm, isSubmitting}) => (
                    <Card variant="outlined">
                        <CardContent className='pa-2'>
                            <Form >
                                <h1>Add Department</h1>
                                <div >
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