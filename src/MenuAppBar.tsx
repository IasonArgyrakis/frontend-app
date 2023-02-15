import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {MenuItem} from "@mui/material";
import {isLoggedIn, logout} from "./services/auth";


export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log('menu')
        setAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate()


    const handleClose = () => {
        setAnchorEl(null);
    };

    function toNavigate(url: string) {
        navigate(url)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                {!isLoggedIn() &&
                    <Toolbar>

                        <MenuItem onClick={() => toNavigate("/login")}>
                            Login

                        </MenuItem>
                        <MenuItem onClick={() => toNavigate("/register")}>
                            Register
                        </MenuItem>
                    </Toolbar>
                }
                {isLoggedIn() &&
                    <Toolbar>
                        <MenuItem onClick={() => toNavigate("/users")}>
                            Users

                        </MenuItem>
                        <MenuItem onClick={() => toNavigate("/departments")}>
                            Departments
                        </MenuItem>
                        <MenuItem onClick={() => {logout() ;toNavigate("/login") }}>
                            Log Out
                        </MenuItem>
                    </Toolbar>
                }
            </AppBar>
        </Box>
    );
}
