import { VitalsContext } from "@/app/plan/page"
import { useContext } from "react"
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableHead } from "@mui/material";

export default function VitalsMetaData() {
  const { vitals } = useContext(VitalsContext)
  const { name, gender, age, weight, height, bmi, bmr } = vitals
  const HEADERS = ["Name", "Gender/Age", "Weight", "Height", "BMI", "BMR"]
  const GENDERS = {
    male: "Male",
    female: "Female"
  }

  return (
    <>
      <TableHead>
        <TableRow sx={{ visibility: 'collapse' }}>
          {HEADERS.map(column => (
            <TableCell key={column} style={{ visibility: column === "Name" ? "collapse" : "" }}
              className='meta-data-cell'
              sx={{ fontWeight: 600 }}>{column}
            </TableCell>
          ))}
        </TableRow>
        <TableRow sx={{ visibility: 'collapse' }}>
          <TableCell className='meta-data-cell'>{ name }</TableCell>
          <TableCell className='meta-data-cell'>{ `${GENDERS[gender]}/${age}` }</TableCell>
          <TableCell className='meta-data-cell'>{ weight }</TableCell>
          <TableCell className='meta-data-cell'>{ height }</TableCell>
          <TableCell className='meta-data-cell'>{ bmi }</TableCell>
          <TableCell className='meta-data-cell'>{ bmr }</TableCell>
        </TableRow>
        <TableRow sx={{ visibility: 'collapse' }}></TableRow>
      </TableHead>
    </>
  )
}