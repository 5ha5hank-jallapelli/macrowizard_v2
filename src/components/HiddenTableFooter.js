import { MacroReferenceValuesContext } from "@/app/plan/page";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useContext } from "react"

export default function HiddenTableFooter({ totalQuantity, totalCarbohydrates, totalProteins, totalFats, totalEnergy }) {
  const { macroReferenceValues, setMacroReferenceValues } = useContext(MacroReferenceValuesContext)
  const {
    totalCalories,
    calorieCarbs,
    calorieProtein,
    calorieFats,
  } = macroReferenceValues

  return (
    <>
      <TableRow sx={{visibility: 'collapse' }}>
        <TableCell className='total-cell' sx={{fontWeight: 600}}>Total</TableCell>
        <TableCell className='total-item-cell' align='center' sx={{fontWeight: 600}}>{ totalQuantity }</TableCell>
        <TableCell className='total-item-cell' align='center' sx={{ fontWeight: 600 }}>{ totalCarbohydrates }</TableCell>
        <TableCell className='total-item-cell' align='center' sx={{ fontWeight: 600 }}>{ totalProteins }</TableCell>
        <TableCell className='total-item-cell' align='center' sx={{ fontWeight: 600 }}> { totalFats }</TableCell>
        <TableCell className='total-item-cell' align='center' sx={{ fontWeight: 600 }}>{ totalEnergy }</TableCell>
      </TableRow>
      <TableRow sx={{visibility: 'collapse' }}>
        <TableCell className='reference-cell' sx={{fontWeight: 600}}>Reference</TableCell>
        <TableCell className='reference-item-cell' align='center' sx={{fontWeight: 600}}>--</TableCell>
        <TableCell className='reference-item-cell' align='center' sx={{ fontWeight: 600 }}>{ calorieCarbs }</TableCell>
        <TableCell className='reference-item-cell' align='center' sx={{ fontWeight: 600 }}>{ calorieProtein }</TableCell>
        <TableCell className='reference-item-cell' align='center' sx={{ fontWeight: 600 }}> { calorieFats }</TableCell>
        <TableCell className='reference-item-cell' align='center' sx={{ fontWeight: 600 }}>{ totalCalories }</TableCell>
      </TableRow>
    </>
  )
}