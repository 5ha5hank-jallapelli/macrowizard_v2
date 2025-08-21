"use client"

import { Button } from "@mui/material";

export default function CategoryFilterButton({ filterModel, category, filterCategory, btnLabel }) {
  const btnStyles = {
    lineHeight: 'unset',
    minWidth: 'unset',
    borderRadius: '0',
    padding: '0px 10px',
    borderRight: '1px solid #1976d2',
    fontSize: '9px',
    color: '#1976d2'
  }

  const isFilterModelSet = filterModel.items.length;
  const filterModelValue = isFilterModelSet ? filterModel.items[0].value : null

  return (
    <Button
      className={`${isFilterModelSet && filterModelValue == category ? "active" : ''} btn-category`}
      variant="text"
      size='small'
      sx={ btnStyles }
      onClick={(e) => { e.preventDefault(); filterCategory(category) }}>{ btnLabel }</Button>
  )
}