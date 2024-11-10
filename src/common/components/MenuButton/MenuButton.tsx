import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import React from "react";
import {useAppDispatch} from "common/hooks";
import {useAppSelector} from "common/hooks";
import {logoutTC, selectIsLoggedIn} from "../../../features/auth/model/authSlice";
import {changeTheme, selectThemeMode} from "../../../app/appSlice";

export const MenuButton = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const changeModeHandler = () => {
        dispatch(changeTheme({themeMode: themeMode === 'light' ? 'dark' : 'light'
    }))
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box>
            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>LogOut</Button>}
            <Button color="inherit">Faq</Button>
            <Switch color={'default'} onChange={changeModeHandler}/>
        </Box>
    );
};