import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import React from "react";
import {useAppDispatch} from "common/hooks";
import {useAppSelector} from "common/hooks";
import {
    changeTheme,
    selectIsLoggedIn,
    selectThemeMode,
    setIsLoggedIn
} from "../../../app/appSlice";
import {useLogoutMutation} from "../../../features/auth/api/authApi";
import {ResultCode} from "common/enums";
import {baseApi} from "../../../app/baseApi";

export const MenuButton = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const [logout] = useLogoutMutation()

    const changeModeHandler = () => {
        dispatch(changeTheme({themeMode: themeMode === 'light' ? 'dark' : 'light'
    }))
    }
    const logoutHandler = () => {
      logout().then((res)=>{
          if(res.data?.resultCode === ResultCode.Success) {
              dispatch(setIsLoggedIn({isLoggedIn: false}))
              localStorage.removeItem('sn-token')
          }
      })
          .then(()=>{
              dispatch(baseApi.util.invalidateTags(['Task', 'Todolist']))
          })
    }

    return (
        <Box>
            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>LogOut</Button>}
            <Button color="inherit">Faq</Button>
            <Switch color={'default'} onChange={changeModeHandler}/>
        </Box>
    );
};