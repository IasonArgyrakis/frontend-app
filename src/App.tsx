import React from 'react';




import './App.css';

import MenuAppBar from "./MenuAppBar";
import {Container} from "@mui/material";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import DepartmentPage from "./pages/DepartmentPage";
import {isLoggedIn} from "./services/auth";



class App extends React.Component {

    render() {
        return (
            <BrowserRouter>

                <MenuAppBar/>
                <Container maxWidth="xl">

                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/register" />}
                            />
                            <Route path="/users" element={<UserPage/>}/>
                            <Route path="/login" element={<LoginPage />}/>
                            <Route path="/register" element={<RegisterPage />}/>
                            <Route path="/departments" element={<DepartmentPage/>}/>

                        </Routes>

                </Container>

            </BrowserRouter>

        );
    }
}

export default App;
