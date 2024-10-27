import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import React from "react"
import {useAppSelector} from "common/hooks";
import {selectTodolists} from "../../model/todolistsSelector";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid item xs={3} key={tl.id}>
            <Paper square={false} variant="elevation" elevation={2} sx={{ p: "20px" }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
