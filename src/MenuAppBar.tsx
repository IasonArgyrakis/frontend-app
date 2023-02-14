import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {MenuItem} from "@mui/material";


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
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <MenuItem onClick={()=>toNavigate("/users")}>
                        Users

                    </MenuItem>
                    <MenuItem onClick={()=>toNavigate("/departments")}>
                        Departments
                    </MenuItem>


                </Toolbar>
            </AppBar>
        </Box>
    );
}
