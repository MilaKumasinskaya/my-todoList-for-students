import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import React, {useEffect} from "react";
import {selectTodolists} from "../../model/todolistsSelector";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {fetchTodolistsTC} from "../../model/todolists-reducer";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return <>
        {todolists.map((tl) => {
            return (
                <Grid key={tl.id}>
                    <Paper square={false} variant="elevation" elevation={2} sx={{p: '20px', m: '20px'}}>
                        <Todolist todolist={tl}/>
                    </Paper>
                </Grid>
            )
        })
        }
    </>
};
