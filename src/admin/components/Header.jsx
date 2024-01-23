import * as React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';

const drawerWidth = 260;

const Header = ({title}) => {
    return (
        <AppBar
            color="inherit"
            position="fixed"
            sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;