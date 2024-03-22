import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button, Link, Stack, Typography } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack direction={'row'} display={'flex'} justifyContent={'center'}>
        <Link href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </Link>
        <Link href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </Link>
      </Stack>
      <Typography variant='h2'>Vite + React</Typography>
      <Stack padding={'2em'}>
        <Button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </Button>
        <Typography variant='body1'>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Stack>
      <Typography variant='body1' color={'#888'}>
        Click on the Vite and React logos to learn more
      </Typography>
    </>
  );
}

export default App;
