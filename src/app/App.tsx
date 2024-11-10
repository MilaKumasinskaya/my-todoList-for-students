import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {ErrorSnackbar, Header} from "common/components";
import {getTheme} from "common/theme";
import {useAppDispatch, useAppSelector} from "common/hooks";
import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {initializeAppTC, selectIsInitialized} from "../features/auth/model/authSlice";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {selectThemeMode} from './appSlice';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isInitialized = useAppSelector(selectIsInitialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            {isInitialized ?
                <>
                    <Header/>
                    <Outlet/>
                </> :
                <Box sx={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                    <CircularProgress size={150} thickness={3}/>
                </Box>
            }
            <ErrorSnackbar/>
        </ThemeProvider>
    );
};


