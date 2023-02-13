import React from 'react';

import './App.css';

import MenuAppBar from "./MenuAppBar";
import {Container} from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from "./pages/RegisterPage";


class App extends React.Component {
    render() {
        return (
            <div>
                <MenuAppBar/>
                <Container maxWidth="md">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />}/>
                            <Route path="/register" element={<RegisterPage />}/>
                            <Route path="/users" element={<DashboardPage />}/>

                        </Routes>
                    </BrowserRouter>
                </Container>
            </div>

        );
    }
}

export default App;
