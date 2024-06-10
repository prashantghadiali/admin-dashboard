import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Box textAlign="center" py={10} px={6}>
        <Typography
          variant="h1"
          component="h2"
          sx={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #1de9b6, #1dc4e9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" component="h2" mt={3} mb={2}>
          Page Not Found
        </Typography>
        <Typography color="textSecondary" mb={6}>
          The page you're looking for does not seem to exist
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouteLink}
          to="/"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;