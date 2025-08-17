"use client"

import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SelectedItems({ itemsList }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0)
  const [totalProteins, setTotalProteins] = useState(0)
  const [totalFats, setTotalFats] = useState(0)
  const [totalEnergy, setTotalEnergy] = useState(0)

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
    return (arr.reduce((acc, item) => acc + item[type], 0)).toFixed(2)
  }

  return (
    <div style={{ width: '850px', height: 'calc(100vh - 159px)', marginInline: 'auto' }}>
      <TableContainer component={Paper} sx={{height: 'calc(100vh - 159px)'}}>
        <Table sx={{position: 'relative'}} aria-label="Selected Items" size='small'>
          <TableHead>
            <TableRow sx={{position: 'sticky', top: '0px', zIndex: '10', backgroundColor: 'white'}}>
              <TableCell sx={{ fontWeight: 600}}>Food Item</TableCell>
              <TableCell sx={{ fontWeight: 600}} align='center'>Amount (g)</TableCell>
              <TableCell sx={{ fontWeight: 600}} align='center'>Carbohydrates (g)</TableCell>
              <TableCell sx={{ fontWeight: 600}} align='center'>Proteins (g)</TableCell>
              <TableCell sx={{ fontWeight: 600}} align='center'>Fats (g)</TableCell>
              <TableCell sx={{ fontWeight: 600}} align='center'>Energy (cal)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{position: 'relative'}}>
            {selectedItems.map((row, index) => {
              const isFirst = !uniqueCategories.has(row.category)
              if (isFirst) uniqueCategories.add(row.category)
              return (
                <Fragment key={index}>
                  {isFirst && (
                    <TableRow className={`row--${row.category}`} key={`header__${row.category}`}>
                      <TableCell sx={{ fontWeight: 600, fontStyle: 'italic' }}>{CATEGORIES[row.category]}</TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  )}
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.carbohydrates || 0}</TableCell>
                    <TableCell align="center">{row.proteins}</TableCell>
                    <TableCell align="center">{row.fats}</TableCell>
                    <TableCell align="center">{row.energy}</TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
            <TableRow sx={{position: 'sticky', bottom: '0px', zIndex: '10', backgroundColor: 'gold', }}>
              <TableCell sx={{fontWeight: 600}}>Total</TableCell>
              <TableCell align='center' sx={{fontWeight: 600}}>{totalQuantity}</TableCell>
              <TableCell align='center' sx={{fontWeight: 600}}>{totalCarbohydrates}</TableCell>
              <TableCell align='center' sx={{fontWeight: 600}}>{totalProteins}</TableCell>
              <TableCell align='center' sx={{fontWeight: 600}}>{totalFats}</TableCell>
              <TableCell align='center' sx={{fontWeight: 600}}>{totalEnergy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}