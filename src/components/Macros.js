import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Typography, Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import { MacroReferenceValuesContext } from '@/app/plan/page';
import { useContext, useState } from 'react';

export default function Macros() {
  const { macroReferenceValues, setMacroReferenceValues } = useContext(MacroReferenceValuesContext)

  const {
    totalCalories,

    carbsPercent,
    calorieCarbs,
    servingCarbs,

    proteinPercent,
    calorieProtein,
    servingProtein,

    fatsPercent,
    calorieFats,
    servingFats
  } = macroReferenceValues

  const calculateCarbs = (percent) => {
    const calories = totalCalories / (100 / percent)
    const serving = (calories / 4).toFixed(2)

    setMacroReferenceValues(prevState => ({ ...prevState, calorieCarbs: calories, servingCarbs: serving }))
  }

  const calculateProteins = (percent) => {
    const calories = totalCalories / (100 / percent)
    const serving = (calories / 4).toFixed(2)

    setMacroReferenceValues(prevState => ({ ...prevState, calorieProtein: calories, servingProtein: serving }))
  }

  const calculateFats = (percent) => {
    const calories = totalCalories / (100 / percent)
    const serving = (calories / 9).toFixed(2)

    setMacroReferenceValues(prevState => ({ ...prevState, calorieFats: calories, servingFats: serving }))
  }

  return (
    <>
      <h6 style={{ fontSize: '16px', margin: '0px' }}>Macro Calculations</h6>
      <Divider sx={{ marginTop: '5px', marginBottom: '10px' }} />
      <div>
        <FormControl sx={{ width: '16ch' }}>
          <FormHelperText id="outlined-age-helper-text">Calories</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-calories"
            value={totalCalories}
            onChange={(e) => setMacroReferenceValues(prevState => ({...prevState, totalCalories: e.target.value}))}
          />
        </FormControl>
        <Divider sx={{ margin: '15px 0 10px' }} />
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-between' }}>
          <FormControl sx={{ width: '16ch' }}>
            <FormHelperText id="outlined-carbohydrates-helper-text">Carbohydrates</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-carbohydrates"
              value={carbsPercent}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              onChange={(e) => {setMacroReferenceValues(prevState => ({ ...prevState, carbsPercent: e.target.value })); calculateCarbs(e.target.value)}}
            />
          </FormControl>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
              <LocalFireDepartmentIcon />
              { calorieCarbs } cals
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
              <ScaleIcon />
              { servingCarbs } gms
            </div>
          </div>
        </div>
        <Divider sx={{ marginTop: '15px', marginBottom: '10px' }} />
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-between' }}>
          <FormControl sx={{ width: '16ch' }}>
            <FormHelperText id="outlined-proteins-helper-text">Proteins</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-proteins"
              value={proteinPercent}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              onChange={(e) => {
                setMacroReferenceValues(prevState => ({ ...prevState, proteinPercent: e.target.value }));
                calculateProteins(e.target.value)
              }}
            />
          </FormControl>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
              <LocalFireDepartmentIcon />
              { calorieProtein } cals
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
              <ScaleIcon />
              { servingProtein } gms
            </div>
          </div>
        </div>
        <Divider sx={{ marginTop: '15px', marginBottom: '10px' }} />
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-between', marginBottom: '5px' }}>
          <FormControl sx={{ width: '16ch' }}>
            <FormHelperText id="outlined-fats-helper-text">Fats</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-fats"
              value={fatsPercent}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              onChange={(e) => {
                setMacroReferenceValues(prevState => ({ ...prevState, fatsPercent: e.target.value }));
                calculateFats(e.target.value)
              }}
            />
          </FormControl>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
              <LocalFireDepartmentIcon />
              { calorieFats } cals
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
              <ScaleIcon />
              { servingFats } gms
            </div>
          </div>
        </div>
      </div>
    </>
  )
}