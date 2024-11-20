import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {ErrorSnackbar, Header} from "common/components";
import {getTheme} from "common/theme";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {Outlet} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {selectThemeMode, setIsLoggedIn} from './appSlice';
import {useMeQuery} from "../features/auth/api/authApi";
import {useEffect, useState} from "react";
import {ResultCode} from "common/enums";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const [isInitialized, setIsInitialized] = useState(false)
    const {data, isLoading} = useMeQuery()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!isLoading){
            setIsInitialized(true)
            if(data?.resultCode === ResultCode.Success){
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            }
        }
    }, [isLoading, data])

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


