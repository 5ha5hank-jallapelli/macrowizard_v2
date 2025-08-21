"use client"

import { Button } from "@mui/material"

export default function ClearFilterButton({ handleClearFilter, show }) {
  const btnStyles = {
    lineHeight: 'unset',
    minWidth: 'unset',
    borderRadius: '0',
    padding: '2px 4px 2px',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Button variant="outlined" color="error" sx={{...btnStyles, textTransform: 'capitalize', display: show ? 'block' : 'none'}} onClick={(e) => { e.preventDefault(); handleClearFilter() }}>
      Clear Filter
    </Button>
  )
}