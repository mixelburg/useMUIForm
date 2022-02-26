import React from 'react'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import useForm from 'useForm'

function App() {
  const { state, register, reset, forceValidate, clear } = useForm('form')

  const handleSubmit = () => {
    if(forceValidate()) {
      console.log(state)
      clear()
    }
  }

  return (
    <Box width='100vw' height='100vh'>
      <Stack
        height='100%'
        width='100%'
        direction='column'
        alignItems='center'
        justifyContent='center'
        spacing={2}
      >
        <Box maxWidth='400px' width='100%'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction='row' justifyContent='space-between'>
                <Typography variant='h5'>Sample Form</Typography>
                <Button onClick={reset} variant='contained' color='warning'>
                  RESET
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='username'
                variant='outlined'
                {...register('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='password'
                variant='outlined'
                {...register('password')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='gender'
                variant='outlined'
                select
                {...register('gender', {default: 'male'})}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='idiot'>Idiot</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='brain type'
                variant='outlined'
                select
                {...register('brain', {default: 'normal'})}
              >
                <MenuItem value='normal'>Normal</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Stack direction='row' justifyContent='center' width='100%'>
                <Button
                  onClick={handleSubmit}
                  sx={{ px: 3, py: 1 }}
                  variant='contained'
                >
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}

export default App
