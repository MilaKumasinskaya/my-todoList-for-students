import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import React from "react";
import {useGetTodolistsQuery} from "../../api/todolistsApi";


export const Todolists = () => {
    const {data: todolists} = useGetTodolistsQuery()

    return <>
        {todolists?.map((tl) => {
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
