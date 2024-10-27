import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import React from "react"
import { addTodolistAC } from "../features/todolists/model/todolists-reducer"
import Box from "@mui/material/Box"
import {useAppDispatch} from "common/hooks";
import {AddItemForm} from "common/components/AddItemForm";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Container fixed sx={{ m: "20px" }}>
        <Grid container sx={{ m: "30px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          <Todolists />
        </Grid>
      </Container>
    </Box>
  )
}
