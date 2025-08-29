import * as XLSX from 'xlsx-js-style'
import { saveAs } from 'file-saver'

export default function exportToExcel() {
  const table = document.getElementById('plan-table')
  debugger
  const clonedTable = table.cloneNode(true)
  clonedTable.querySelector('.xlxs-hide').remove()
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(clonedTable)

  XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  worksheet["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 600, c: 600 } });

  const bold = {font: { bold: true }}
  const hCenter = {alignment: { horizontal: 'center'}}
  const hStart = { alignment: { horizontal: 'left' } }

  const allBorders = {
    border: {
      top: {
        style: 'thin',
        color: '#000'
      },
      right: {
        style: 'thin',
        color: '#000'
      },
      bottom: {
        style: 'thin',
        color: '#000'
      },
      left: {
        style: 'thin',
        color: '#000'
      }
    }}

  worksheet["!cols"] = [
    { wch: 30 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ]

  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let R = range.s.r; R <= range.e.c; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell_addr = XLSX.utils.encode_cell({r: R, c: C});
    const cell = worksheet[cell_addr]
      if (cell) {
        const cellElement = table.rows[R].cells[C]
        if (cellElement.classList.contains("fw-bold")) {
          cell.s = {...bold}
        }
        if (cellElement.classList.contains("item-column")) {
        cell.s = {...bold,...hCenter}
        }
        if (cellElement.classList.contains("total-cell")) {
          cell.s = {
            ...bold,
            hide: true,
            fill: {fgColor:{ rgb: "ffd700"}},
          }
        }
        if (cellElement.classList.contains("total-item-cell")) {
          cell.s = {
            ...bold,
            ...hCenter,
            hide: true,
            fill: {fgColor:{ rgb: "ffd700"}},
          }
        }
        if (cellElement.classList.contains("reference-cell")) {
          cell.s = {
          ...bold,
          fill: {fgColor:{ rgb: "afeeee"}},
        }
        }
        if (cellElement.classList.contains("reference-item-cell")) {
          cell.s = {
            ...bold,
            ...hCenter,
            fill: {fgColor:{ rgb: "afeeee"}},
          }
        }
        if (cellElement.classList.contains("meta-data-cell")) {
          cell.s = {
            ...bold,
            ...hStart,
            fill: {fgColor:{ rgb: "afeeee"}},
          }
        }
        if (cellElement.classList.contains("cell-body")) {
          cell.s = { ...hCenter }
        }
        if (cellElement.classList.contains("row--cereals")) {
          cell.s = { ...bold, fill: { fgColor: { rgb: 'fdf5e6'}}}
        }
        if (cellElement.classList.contains("row--pulses")) {
          cell.s = { ...bold, fill: { fgColor: { rgb: 'EBE9D2'}}}
        }
        if (cellElement.classList.contains("row--nutsAndOilseeds")) {
          cell.s = { ...bold, fill: { fgColor: { rgb: 'F6F0BA'}}}
        }
        if (cellElement.classList.contains("row--meatAndPoultry")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'E6C9CA'}}}
        }
        if (cellElement.classList.contains("row--seafood")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'B0E0E6'}}}
        }
        if (cellElement.classList.contains("row--vegetables")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'D5FFD7'}}}
        }
        if (cellElement.classList.contains("row--mushrooms")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'FFDAE0'}}}
        }
        if (cellElement.classList.contains("row--fruits")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'F4B395'}}}
        }
        if (cellElement.classList.contains("row--milkProducts")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'F0F8FF'}}}
        }
        if (cellElement.classList.contains("row--rootsAndTubers")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'fff8dc'}}}
        }
        if (cellElement.classList.contains("row--condimentsSpicesFresh")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'ccffcc'}}}
        }
        if (cellElement.classList.contains("row--condimentsSpicesDry")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'faebd7'}}}
        }
        if (cellElement.classList.contains("row--miscellaneousFoods")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'bdb8e0'}}}
        }
        if (cellElement.classList.contains("row--sugars")) {
        cell.s = {...bold, fill: { fgColor: { rgb: 'd5ff95'}}}
        }
        if (cellElement.classList.contains("h-start")) {
          cell.s = {...hStart}
        }
        cell.s = {...cell.s, ...allBorders}
      }
    }
  }
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1")

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  const blob = new Blob([wbout], { type: 'application/vnd.ms-excel' });
  saveAs(blob, 'plan.xlsx');
}