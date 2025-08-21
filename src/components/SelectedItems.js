"use client"

import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MacroReferenceValuesContext } from '@/app/plan/page';
import { useContext } from 'react';
import { Button, Box } from '@mui/material';
import HiddenTableFooter from './HiddenTableFooter';

import DownloadIcon from '@mui/icons-material/Download';
import exportToExcel from '@/lib/exportToExcel';
import VitalsMetaData from './VitalsMetaData';

export default function SelectedItems({ itemsList }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0)
  const [totalProteins, setTotalProteins] = useState(0)
  const [totalFats, setTotalFats] = useState(0)
  const [totalEnergy, setTotalEnergy] = useState(0)

  const { macroReferenceValues } = useContext(MacroReferenceValuesContext)
  const { calorieCarbs, calorieProtein, calorieFats, totalCalories } = macroReferenceValues

  const uniqueCategories = new Set()

  const CATEGORIES = {
    cereals: "Cereals",
    pulses: "Pulses",
    nutsAndOilseeds: "Nuts and Oil Seeds",
    meatAndPoultry: "Meat and Poultry",
    vegetables: "Vegetables",
    seafood: "Seafood",
    mushrooms: "Mushrooms",
    fruits: "Fruits",
    milkProducts: "Milk and Milk Products"
  }

  useEffect(() => {
    const selectedListItems = itemsList.filter(item => item.isSelected)
    const quantity = calculateTotal(selectedListItems, 'quantity')
    const carbohydrates = calculateTotal(selectedListItems, 'carbohydrates')
    const proteins = calculateTotal(selectedListItems, 'proteins')
    const fats = calculateTotal(selectedListItems, 'fats')
    const energy = calculateTotal(selectedListItems, 'energy')

    setSelectedItems(selectedListItems)
    setTotalQuantity(quantity)
    setTotalCarbohydrates(carbohydrates)
    setTotalProteins(proteins)
    setTotalFats(fats)
    setTotalEnergy(energy)
  }, [])

  const calculateTotal = (arr, type) => {
    const total = arr.reduce((acc, item) => Number(acc + item[type]), 0).toFixed(2)
    return Number(total)
  }

  const totalMarkup = (value, referenceValue) => {
    const diff = Math.round((referenceValue - value).toFixed(2))

    return `${value} ${referenceValue > 0 ? `/ <span style="opacity: 0.5">${referenceValue}</span><br/>
      <span style="color: ${diff > 0 ? 'green' : 'red'}">${diff > 0 ? `+${diff}` : diff}<span>` : ''}`
  }

  return (
    <Box sx={{ width: '850px', height: 'calc(100vh - 159px)', marginInline: 'auto' }}>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '0px'}}>
        <Button id='btn-download' sx={{marginLeft: 'auto'}} onClick={() => exportToExcel()}><DownloadIcon /></Button>
      </Box>
      <TableContainer component={Paper} sx={{ height: 'calc(100vh - 230px)', boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)' }}>
        <Table sx={{ position: 'relative' }} id="plan-table" aria-label="Selected Items" size='small'>
          <VitalsMetaData />
          <TableHead>
            <TableRow sx={{position: 'sticky', top: '0px', zIndex: '10', backgroundColor: 'white'}}>
              <TableCell className='fw-bold' sx={{ fontWeight: 600}}>Food Item</TableCell>
              <TableCell className='item-column' sx={{ fontWeight: 600}} align='center'>Amount (g)</TableCell>
              <TableCell className='item-column' sx={{ fontWeight: 600}} align='center'>Carbohydrates (g)</TableCell>
              <TableCell className='item-column' sx={{ fontWeight: 600}} align='center'>Proteins (g)</TableCell>
              <TableCell className='item-column' sx={{ fontWeight: 600}} align='center'>Fats (g)</TableCell>
              <TableCell className='item-column' sx={{ fontWeight: 600}} align='center'>Energy (cal)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{position: 'relative'}}>
            {selectedItems.map((row, index) => {
              const isFirst = !uniqueCategories.has(row.category)
              if (isFirst) uniqueCategories.add(row.category)
              return (
                <Fragment key={index}>
                  {isFirst && (
                    <TableRow key={`header__${row.category}`}>
                      <TableCell className={`row--${row.category}`} sx={{ fontWeight: 600, fontStyle: 'italic' }}>{CATEGORIES[row.category]}</TableCell>
                      <TableCell className={`row--${row.category}`}> </TableCell>
                      <TableCell className={`row--${row.category}`}> </TableCell>
                      <TableCell className={`row--${row.category}`}> </TableCell>
                      <TableCell className={`row--${row.category}`}> </TableCell>
                      <TableCell className={`row--${row.category}`}> </TableCell>
                    </TableRow>
                  )}
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell className='cell-body' align="center">{row.quantity}</TableCell>
                    <TableCell className='cell-body' align="center">{row.carbohydrates || 0}</TableCell>
                    <TableCell className='cell-body' align="center">{row.proteins}</TableCell>
                    <TableCell className='cell-body' align="center">{row.fats}</TableCell>
                    <TableCell className='cell-body' align="center">{row.energy}</TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
            <HiddenTableFooter
              totalQuantity={totalQuantity}
              totalCarbohydrates={totalCarbohydrates}
              totalProteins={totalProteins}
              totalFats={totalFats}
              totalEnergy={totalEnergy}
            />
            <TableRow className='xlxs-hide' sx={{position: 'sticky', bottom: '-1px', zIndex: '10', backgroundColor: 'gold' }}>
              <TableCell sx={{fontWeight: 600}}>Total</TableCell>
              <TableCell align='center' sx={{fontWeight: 600}}>{totalQuantity}</TableCell>
              <TableCell align='center' sx={{ fontWeight: 600 }} dangerouslySetInnerHTML={{__html: totalMarkup(totalCarbohydrates, calorieCarbs)}}></TableCell>
              <TableCell align='center' sx={{fontWeight: 600}} dangerouslySetInnerHTML={{__html: totalMarkup(totalProteins, calorieProtein)}}></TableCell>
              <TableCell align='center' sx={{fontWeight: 600}} dangerouslySetInnerHTML={{__html: totalMarkup(totalFats, calorieFats)}}></TableCell>
              <TableCell align='center' sx={{ fontWeight: 600 }} dangerouslySetInnerHTML={{__html: totalMarkup(totalEnergy, totalCalories)}}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}