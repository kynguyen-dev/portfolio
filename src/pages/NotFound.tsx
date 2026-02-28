import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PFTypography } from '@components/core';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      flex={1}
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100vh'
      spacing={3}
      sx={{
        background: 'linear-gradient(180deg, #0B0D2E 0%, #1B1145 40%, #4A1942 100%)',
      }}
    >
      <PFTypography variant='h1' fontWeight={600} sx={{ color: '#F5D060' }}>
        404
      </PFTypography>
      <PFTypography variant='h5' sx={{ color: '#FFE4B5' }}>Page Not Found</PFTypography>
      <Button variant='contained' sx={{ backgroundColor: '#D4A843', '&:hover': { backgroundColor: '#E8C96A' } }} onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Stack>
  );
};

export default NotFound;
