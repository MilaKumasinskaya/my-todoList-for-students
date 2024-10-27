import {useAppSelector} from "common/hooks";
import {selectThemeMode} from "./appSelectors";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "common/theme";
import {Main} from "./Main";
import {Header} from "common/components/Header";


export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
