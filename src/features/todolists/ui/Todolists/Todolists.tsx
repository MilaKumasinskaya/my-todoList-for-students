import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useGetTodolistsQuery} from "../../api/todolistsApi";
import {TodolistSkeleton} from "../skeletons/TodolistSkeleton/TodolistSkeleton";


export const Todolists = () => {
    const {data: todolists, isLoading} = useGetTodolistsQuery(undefined, {
        // pollingInterval: 3000,
        // skipPollingIfUnfocused: true
    })

    if(isLoading){
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
                {Array(3)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </div>
        )
    }

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
