import React, {useState} from 'react';

import {register, User} from '../services/auth';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, TextField} from "@mui/material";


const LoginPage = () => {

    const [form, updateForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        afm: "",
        errors: {
            email: false,
            password: false,
            firstName: false,
            lastName: false,
            afm: false,
        }
    });

    const handleChange = (key: string, e: any) => {
        let updatedValue = {};
        updatedValue = {[key]: e.target.value};
        updateForm(form => ({
            ...form,
            ...updatedValue
        }));
    }
    const handleError = (value: any) => {
        let updatedValue = {};
        updatedValue = {...value};

        updateForm(form => ({
            ...form,
            ...updatedValue
        }));
    }


    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const user_creds: User = {
                email: form.email,
                password: form.password,
                afm: form.afm,
                firstName: form.firstName,
                lastName: form.lastName,
            }
            await register(user_creds);
            navigate("/")
        } catch (error) {


            if (axios.isAxiosError(error)) {
                let error_msgs: [] = error?.response?.data?.message;

                let new_errors = {errors: form.errors};


                const split = function split(str: string, index: number) {
                    return [str.slice(0, index), str.slice(index + 1)];
                }


                error_msgs.forEach((error_msg: string) => {

                    const index = error_msg.indexOf(" ");
                    const [key, value] = split(error_msg, index)
                    // @ts-ignore
                    new_errors[key] = value;
                })

                handleError({errors: new_errors})


            }

        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="First Name"
                        value={form.firstName}
                        helperText={form.errors.firstName}
                        error={form.errors.firstName}
                        onChange={(event) => handleChange("firstName", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="Last Name"
                        value={form.lastName}
                        helperText={form.errors.lastName}
                        error={form.errors.lastName}
                        onChange={(event) => handleChange("lastName", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="afm"
                        value={form.afm}
                        helperText={form.errors.afm}
                        error={form.errors.afm}
                        onChange={(event) => handleChange("afm", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="email"
                        value={form.email}
                        helperText={form.errors.email}
                        error={form.errors.email !== false}
                        onChange={(event) => handleChange("email", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="password"
                        value={form.password}
                        helperText={form.errors.password}
                        error={form.errors.password}
                        onChange={(event) => handleChange("password", event)}
                    />
                </div>
                <Button color='primary' type='submit'>Login</Button>
            </form>
        </div>
    );
};

export default LoginPage;