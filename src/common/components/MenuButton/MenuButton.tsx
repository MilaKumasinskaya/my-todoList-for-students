import Button from "@mui/material/Button"
import Switch from "@mui/material/Switch"
import Box from "@mui/material/Box"
import { changeThemeAC } from "../../../app/app-reducer"
import {useAppDispatch, useAppSelector} from "common/hooks";
import {selectThemeMode} from "../../../app/appSelectors";

export const MenuButton = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }
  return (
    <Box>
      <Button color="inherit">Login</Button>
      <Button color="inherit">LogOut</Button>
      <Button color="inherit">Faq</Button>
      <Switch color={"default"} onChange={changeModeHandler} />
    </Box>
  )
}
