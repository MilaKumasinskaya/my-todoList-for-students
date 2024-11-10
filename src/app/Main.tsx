import Grid from "@mui/material/Grid";
import {AddItemForm} from "common/components";
import Container from "@mui/material/Container";
import React from "react";
import { addTodolistTC} from "../features/todolists/model/todolistsSlice";
import { Todolists } from "../features/todolists/ui/Todolists/Todolists";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {Navigate} from "react-router-dom";
import {Path} from "common/router";
import {selectIsLoggedIn} from "../features/auth/model/authSlice";

export const Main = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }
    if(!isLoggedIn){
        return <Navigate to={Path.Login}/>
    }
    return (

            <Container fixed >
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    <Todolists />
                </Grid>
            </Container>

    );
};