import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Oops! Page not found!
            </Typography>
            <Typography variant="body1" paragraph>
                We are very sorry for inconvenience. It looks like you're trying to access a page that was has been deleted or never even existed
            </Typography>
            <Box mt={4}>
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                    Вернуться на главную
                </Button>
            </Box>
        </Container>
    );
};


