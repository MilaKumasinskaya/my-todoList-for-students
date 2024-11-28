import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const TodolistSkeleton = () => {
    return (
        <Grid>
            <Paper square={false} variant="elevation" elevation={2} sx={{m: '20px', padding: '20px'}}>
                <Box sx={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                    <Skeleton width={150} height={50}/>
                    <Skeleton width={25} height={50} />
                </Box>

                <Box sx={{display: 'flex', gap: '15px', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Skeleton width={350} height={50} />
                    <Skeleton width={20} height={40} />
                </Box>

                <>
                    {Array(3)
                        .fill(null)
                        .map((_, id) => (
                            <Box key={id} sx={{display: 'flex'}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
                                    <Skeleton width={20} height={40} />
                                    <Skeleton width={350} height={40} />
                                    <Skeleton width={20} height={40} />
                                </Box>
                            </Box>
                        ))}
                </>

                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '15px',}}>
                    {Array(3)
                        .fill(null)
                        .map((_, id) => (
                            <Skeleton key={id} width={90} height={60} />
                        ))}
                </Box>
            </Paper>
        </Grid>

    )
}