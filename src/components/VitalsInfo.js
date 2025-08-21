import { useContext } from "react"
import { VitalsContext } from "@/app/plan/page"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function VitalsInfo() {
  const { vitals } = useContext(VitalsContext)
  const { gender, age, weight, height, bmi, bmr } = vitals
  const GENDERS = {
    male: "Male",
    female: "Female"
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ position: 'relative', maxWidth: '650px', marginInline: 'auto' }} aria-label="Vitals Information" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell align="center">Age (yrs)</TableCell>
            <TableCell align="center">Weight (kgs)</TableCell>
            <TableCell align="center">Height (cms)</TableCell>
            <TableCell align="center">BMI (kg/m<sup>2</sup>)</TableCell>
            <TableCell align="center">BMR (cals/day)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ position: 'relative' }}>
          <TableRow>
            <TableCell>{GENDERS[gender]}</TableCell>
            <TableCell align="center">{age}</TableCell>
            <TableCell align="center">{weight}</TableCell>
            <TableCell align="center">{height}</TableCell>
            <TableCell align="center">{bmi}</TableCell>
            <TableCell align="center">{bmr}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}