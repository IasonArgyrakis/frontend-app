import React from 'react';




import './App.css';

import MenuAppBar from "./MenuAppBar";
import {Container} from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import DepartmentPage from "./pages/DepartmentPage";



class App extends React.Component {

    render() {
        return (
            <div>
                <MenuAppBar/>
                <Container maxWidth="xl">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />}/>
                            <Route path="/register" element={<RegisterPage />}/>
                            <Route path="/users" element={<UserPage/>}/>
                            <Route path="/departments" element={<DepartmentPage/>}/>

                        </Routes>
                    </BrowserRouter>
                </Container>
            </div>

        );
    }
}

export default App;
