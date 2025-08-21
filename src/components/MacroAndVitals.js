"use client"

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Vitals from './Vitals';
import Macros from './Macros';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function MacroAndVitals() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
      <Grid size={6}>
        <Item sx={{ boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)' }}><Macros /></Item>
      </Grid>
      <Grid size={6}>
        <Item sx={{ boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)' }}><Vitals /></Item>
      </Grid>
    </Grid>
  )
}