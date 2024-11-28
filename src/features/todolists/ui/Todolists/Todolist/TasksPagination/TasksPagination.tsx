import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'
import { PAGE_SIZE } from '../../../../api/tasksApi'
import Box from "@mui/material/Box";

type Props = {
    totalCount: number
    page: number
    setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
    const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <>
            <Pagination
                count={Math.ceil(totalCount / PAGE_SIZE)}
                page={page}
                onChange={changePageHandler}
                shape="rounded"
                color="primary"
                sx={{mb: '10px', display: 'flex', justifyContent: 'center'}}
            />
            <Box sx={{display: 'flex', justifyContent: 'right', mr: '16px'}}>
                <Typography variant="caption">Total: {totalCount}</Typography>
            </Box>
        </>
    )
}