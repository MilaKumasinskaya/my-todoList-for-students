import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {MenuButton} from "common/components";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "common/hooks";
import {selectAppStatus} from "../../../app/appSlice";

export const Header = () => {
    const status = useAppSelector(selectAppStatus)

    return (
        <AppBar position="static" sx={{mb: '20px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <MenuButton />
            </Toolbar>
            {status === 'loading' && <LinearProgress />}

        </AppBar>
    )
}
