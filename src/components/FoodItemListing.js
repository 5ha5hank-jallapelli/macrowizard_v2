'use client'

import { DataGrid } from '@mui/x-data-grid';
import { columns } from '@/lib/columnHeaders';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import CategoryFilterButton from './CategoryFilterButton';
import ClearFilterButton from './ClearFilterButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function FoodItemListing({
  exchangeListItems,
  setExchangeListItems,
  selectedItemsIds,
  setSelectedItemsIds,
  resetTableData
  }) {
  const [filterModel, setFilterModel] = useState({ items: [] })

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
            carbohydrates: calculateMacro(newQuantity, quantity, carbohydrates) || 0,
            proteins: calculateMacro(newQuantity, quantity, proteins),
            fats: calculateMacro(newQuantity, quantity, fats),
            energy: calculateMacro(newQuantity, quantity, energy),
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

  const calculateMacro = (newQuantity, defaultQuantity, type) => Number(((newQuantity / defaultQuantity) * type).toFixed(2))

  const handleCategoryFilter = (category) => {
    setFilterModel({
      items: [{ field: "category", operator: "equals", value: category }]
    })
  }

  const clearFilter = () => {
    setFilterModel({
      items: []
    })
  }

  const categories = [
    { id: 'cereals', label: 'Cereals' },
    { id: 'pulses', label: 'Pulses' },
    { id: 'nutsAndOilseeds', label: 'Nuts & Oil seeds' },
    { id: 'meatAndPoultry', label: 'Meat & Poultry' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'mushrooms', label: 'Mushrooms' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'milkProducts', label: 'Milk Products' }
  ]

  return (
    <>
      <Box sx={{display: 'flex', marginBottom: '10px', justifyContent: 'space-between', maxWidth: '848px', marginInline: 'auto'}}>
        <Box sx={{ display: 'flex' }}>
          {categories.map(category => (
            <CategoryFilterButton
              key={category.id}
              filterModel={filterModel}
              category={category.id}
              filterCategory={handleCategoryFilter}
              btnLabel={category.label} />
          ))}
        </Box>
        <ClearFilterButton filterModel={filterModel} handleClearFilter={clearFilter} show={filterModel.items.length} />
        {/* <Button onClick={() => resetTableData()} variant='contained' size='small' sx={{ minWidth: 'unset', padding: '2px 8px 4px' }}>
          <RestartAltIcon fontSize='16px' />
        </Button> */}
      </Box>
      <Box sx={{ width: '850px', marginInline: 'auto', height: "calc(100vh - 251px)" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                category: false,
              },
            },
          }}
          slotProps={{
            toolbar: {
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true }
            },
          }}
          rows={exchangeListItems}
          columns={columns}
          checkboxSelection
          keepNonExistentRowsSelected
          rowSelectionModel={{ids: selectedItemsIds, type: 'include' }}
          onRowSelectionModelChange={handleRowSelections}
          disableRowSelectionOnClick
          disableColumnFilter
          processRowUpdate={handleRowUpdate}
          onProcessRowUpdateError={ error => console.error(error)}
          density='compact'
          disableColumnSelector
          disableDensitySelector
          showToolbar
          getRowClassName={(params) => `row--${params.row.category}`}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => {setFilterModel(newModel)}}
        />
      </Box>
    </>
  )
}