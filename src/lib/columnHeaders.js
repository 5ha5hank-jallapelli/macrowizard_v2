export const columns = [
  { field: 'item', headerName: 'Food Item', width: 220 },
  {
    field: 'quantity',
    headerName: 'Amount (g)',
    width: 100,
    editable: true,
    headerAlign: 'center',
    valueGetter: (value) => Number(value),
    cellClassName: 'MuiDataGrid-cell--textCenter',
  },
  {
    field: 'carbohydrates',
    headerName: 'Carbohydrates (g)',
    width: 130,
    headerAlign: 'center',
    valueGetter: (value) => Number(value),
    cellClassName: 'MuiDataGrid-cell--textCenter',
  },
  {
    field: 'proteins',
    headerName: 'Proteins (g)',
    width: 100,
    headerAlign: 'center',
    valueGetter: (value) => Number(value),
    cellClassName: 'MuiDataGrid-cell--textCenter',
  },
  {
    field: 'fats',
    headerName: 'Fats (g)',
    width: 80,
    headerAlign: 'center',
    valueGetter: (value) => Number(value),
    cellClassName: 'MuiDataGrid-cell--textCenter',
  },
  {
    field: 'energy',
    headerName: 'Energy (cal)',
    width: 100,
    headerAlign: 'center',
    valueGetter: (value) => Number(value),
    cellClassName: 'MuiDataGrid-cell--textCenter',
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 100,
  }
];