import Skeleton from '@mui/material/Skeleton'
import Box from "@mui/material/Box";

export const TasksSkeleton = () => {
    return (
        <>
            {Array(4)
                .fill(null)
                .map((_, id) => (
                    <Box key={id} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
                            <Skeleton width={20} height={40} />
                            <Skeleton width={150} height={40} />
                        </Box>
                        <Skeleton width={20} height={40} />
                    </Box>
                ))}
        </>
    )
}