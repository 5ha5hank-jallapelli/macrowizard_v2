"use client"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Typography, Divider, Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useContext } from 'react';
import { VitalsContext } from '@/app/plan/page';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function Vitals() {
  const {
    vitals,
    setVitals
  } = useContext(VitalsContext);

  const { name, gender, age, weight, height, bmi, bmr } = vitals

  const calculateVitals = () => {
    calculateBmr();

    switch (gender) {
      case 'male':
        const mbmr = (10 * (weight) + 6.25 * (height) - 5 * (age) + 5).toFixed(2);
        setVitals((prevState) => ({...prevState, bmr: mbmr}))
        break;
      case 'female':
        const fbmr = (10 * (weight) + 6.25 * (height) - 5 * (age) - 161).toFixed(2);
        setVitals((prevState) => ({...prevState, bmr: fbmr}))
        break;
      default:
        setBmr(0)
        break;
    }
  }

  const calculateBmr = () => {
    const heightInMeters = height / 100;
    const b = (weight/(heightInMeters*heightInMeters)).toFixed(2);
    setVitals((prevState) => ({...prevState, bmi: b }))
  }

  return (
    <>
      <h6 style={{ fontSize: '16px', margin: '0px' }}>Vitals Information</h6>
      <Divider sx={{ marginTop: '5px', marginBottom: '10px'}} />
      <Box>
        <Box>
          <FormControl>
            <FormHelperText id="outlined-name-helper-text">Name</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-name"
              placeholder='Name'
              value={name}
              onChange={(e) => setVitals(prevState => ({...prevState, name: e.target.value}))}/>
          </FormControl>
          <Divider sx={{marginBlock: '15px 10px'}} />
        </Box>
        <FormControl sx={{ fontSize: '12px' }}>
          <p style={{fontSize: '0.75rem', marginBottom: '0'}}>Gender</p>
          <RadioGroup
            row
            name="controlled-radio-buttons-group"
            value={gender}
            sx={{ fontSize: '12px' }}
            onChange={(e) => setVitals(prevState => ({...prevState, gender: e.target.value }))}>
            <FormControlLabel value="male" sx={{ fontSize: '12px' }} control={<Radio size='small' />} label="Male" />
            <FormControlLabel value="female" sx={{ fontSize: '12px' }} control={<Radio size='small' />} label="Female" />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ marginBottom: '10px'}} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <FormControl>
            <FormHelperText id="outlined-age-helper-text">Age</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-age"
              value={age}
              onChange={(e) => setVitals(prevState => ({...prevState, age: e.target.value}))}
              endAdornment={<InputAdornment position="end">years</InputAdornment>} />
          </FormControl>
          <FormControl>
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-weight"
              value={weight}
              onChange={(e) => setVitals(prevState => ({...prevState, weight: e.target.value}))}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
          </FormControl>
          <FormControl>
            <FormHelperText id="outlined-height-helper-text">Height</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-height"
              value={height}
              onChange={(e) => setVitals(prevState => ({...prevState, height: e.target.value}))}
              endAdornment={<InputAdornment position="end">cms</InputAdornment>} />
          </FormControl>
        </div>
        <Button
          variant="contained"
          sx={{ marginTop: '15px', textTransform: 'capitalize', paddingInline: '10px', minWidth: 'fit-content' }}
          size='small'
          onClick={() => calculateVitals() }>
          <CalculateIcon />
        </Button>
        <Divider sx={{ marginTop: '15px', marginBottom: '10px'}} />
        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
          <Typography sx={{margin: '0', color: '#000', opacity: '0.8'}}>
            BMI - { bmi } kg/m<sup>2</sup>
          </Typography>
          <Typography sx={{margin: '0', color: '#000', opacity: '0.8', paddingTop: '3px'}}>
            BMR - { bmr } cals/day
          </Typography>
        </Box>
      </Box>
    </>
  )
}