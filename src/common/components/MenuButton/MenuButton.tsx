import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import React from "react";
import {changeThemeAC} from "../../../app/app-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectThemeMode} from "../../../app/appSelectors";
import {selectIsLoggedIn} from "../../../features/auth/model/authSelectors";
import {logoutTC} from "../../../features/auth/model/auth-reducer";
import {Path} from "common/router";
import { Navigate } from "react-router-dom";

export const MenuButton = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
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