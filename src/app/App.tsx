import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {Main} from "./Main";
import {Header} from "../common/components/Header/Header";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
};


