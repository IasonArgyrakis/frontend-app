import React, {useState} from 'react';
import {register, User} from '../services/auth';
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {formBackEndError} from "../services/data.service";


const LoginPage = () => {

    const [form, updateForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        afm: "",
        errors: {
            email: formBackEndError,
            password: formBackEndError,
            firstName: formBackEndError,
            lastName: formBackEndError,
            afm: formBackEndError,
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
            const user_creds: User = {...form}
            await register(user_creds);
            navigate("/")
        } catch (error) {

            console.log(error)

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
                        helperText={form.errors.firstName.message}
                        error={form.errors.firstName.isInvalid}
                        onChange={(event) => handleChange("firstName", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="Last Name"
                        value={form.lastName}
                        helperText={form.errors.lastName.message}
                        error={form.errors.lastName.isInvalid}
                        onChange={(event) => handleChange("lastName", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="afm"
                        value={form.afm}
                        helperText={form.errors.afm.message}
                        error={form.errors.afm.isInvalid}
                        onChange={(event) => handleChange("afm", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="email"
                        value={form.email}
                        helperText={form.errors.email.message}
                        error={form.errors.email.isInvalid}
                        onChange={(event) => handleChange("email", event)}
                    />
                </div>
                <div>
                    <TextField
                        label="password"
                        value={form.password}
                        helperText={form.errors.password.message}
                        error={form.errors.password.isInvalid}
                        onChange={(event) => handleChange("password", event)}
                    />
                </div>
                <Button color='primary' type='submit'>Login</Button>
            </form>
        </div>
    );
};

export default LoginPage;