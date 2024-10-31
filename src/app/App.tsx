import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {Main} from "./Main";
import {ErrorSnackbar, Header} from "common/components";
import {getTheme} from "common/theme";
import {useAppSelector} from "common/hooks";
import {selectAppStatus, selectThemeMode} from "./appSelectors";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";



export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)


    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
            <ErrorSnackbar/>
        </ThemeProvider>
    );
};


