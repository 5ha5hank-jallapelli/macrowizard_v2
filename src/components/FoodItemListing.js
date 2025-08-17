'use client'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import { columns } from '@/lib/columnHeaders';

export default function FoodItemListing({
  exchangeListItems,
  setExchangeListItems,
  selectedItemsIds,
  setSelectedItemsIds,
  }) {

  const handleRowSelections = (rowSelectionsModel) => {
    if (localStorage.getItem('exchangeList') !== null) {
      const selectedItemIds = Array.from(rowSelectionsModel.ids).map(id => {
        return id
      })

      localStorage.setItem('selectedItemIds', JSON.stringify(selectedItemIds))
      setSelectedItemsIds(new Set(JSON.parse(localStorage.getItem('selectedItemIds'))))

      const selectedItems = JSON.parse(localStorage.getItem('exchangeList')).map(foodItem => {
        if (selectedItemIds.includes(foodItem.id)) {
          return { ...foodItem, isSelected: true }
        } else {
          return { ...foodItem, isSelected: false }
        }
      })

      setExchangeListItems(selectedItems)
      localStorage.setItem('exchangeList', JSON.stringify(selectedItems))
    }
  }

  const handleRowUpdate = (updatedRow) => {
    let newRow;

    if (localStorage.getItem('exchangeList') !== null) {
      const updatedExchangeList = JSON.parse(localStorage.getItem('exchangeList')).map(foodItem => {
        if (foodItem.id === updatedRow.id) {
          const newQuantity = Number(updatedRow.quantity)
          const { quantity, carbohydrates, proteins, fats, energy } = updatedRow.default
          newRow = {
            ...updatedRow,
            quantity: newQuantity,
            carbohydrates: ((newQuantity / quantity) * carbohydrates).toFixed(2) || 0,
            proteins: ((newQuantity / quantity) * proteins).toFixed(2),
            fats: ((newQuantity / quantity) * fats).toFixed(2),
            energy: ((newQuantity / quantity) * energy).toFixed(2),
          }
          return newRow
        }
        return { ...foodItem }
      })
      localStorage.setItem('exchangeList', JSON.stringify(updatedExchangeList))
      setExchangeListItems(JSON.parse(localStorage.getItem('exchangeList')))
    }

    return newRow
  }

  return (
    <>
      <Box sx={{ width: '850px', marginInline: 'auto', height: "calc(100vh - 159px)" }}>
        <DataGrid
          rows={exchangeListItems}
          columns={columns}
          checkboxSelection
          keepNonExistentRowsSelected
          rowSelectionModel={{ids: selectedItemsIds, type: 'include' }}
          onRowSelectionModelChange={handleRowSelections}
          disableRowSelectionOnClick
          processRowUpdate={handleRowUpdate}
          onProcessRowUpdateError={ error => console.error(error)}
          density='compact'
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          showToolbar
          getRowClassName={(params) => `row--${params.row.category}`}
          slotProps={{
            toolbar: {
              sx: {height: '36px'},
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true }
            },
          }}
        />
      </Box>
    </>
  )
}