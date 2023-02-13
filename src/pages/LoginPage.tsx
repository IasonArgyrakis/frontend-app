import React from 'react';
import {login, register} from '../services/auth';
import {Button} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {useNavigate} from "react-router-dom";



interface Values {
    email: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const submit = (values: any, {setSubmitting, setErrors}: any) => {

        setSubmitting(false);
        login(values).then(()=>{
                navigate("/")
            }
        ).catch((errors) => {
            setErrors(errors)
        })


    }

    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",

                }}
                validate={(values) => {
                    const errors: Partial<Values> = {};
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
                    <Form>
                        <Field
                            component={TextField}
                            name="email"
                            type="email"
                            label="Email"
                        />
                        <br/>
                        <Field
                            component={TextField}
                            type="password"
                            label="Password"
                            name="password"
                        />
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
        </div>
    );
};

export default LoginPage;