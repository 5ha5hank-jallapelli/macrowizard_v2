'use client'

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect, createContext } from "react"
import SelectedItems from '@/components/SelectedItems';
import FoodItemListing from '@/components/FoodItemListing';
import MacroAndVitals from '@/components/MacroAndVitals';
import VitalsInfo from '@/components/VitalsInfo';

export const VitalsContext = createContext(null);
export const MacroReferenceValuesContext = createContext(null);
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`plan-tabpanel-${index}`}
      style={{padding: '24px'}}
      aria-labelledby={`plan-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `plan-tab-${index}`,
    'aria-controls': `plan-tabpanel-${index}`,
  };
}

export default function Plan() {
  const [data, setData] = useState([])
  const [exchangeListItems, setExchangeListItems] = useState([])
  const [selectedItemsIds, setSelectedItemsIds] = useState(new Set())
  const [value, setValue] = useState(0);
  const [vitals, setVitals] = useState({ name: '', gender: 'male', age: 0, weight: 0, height: 0, bmi: 0, bmr: 0 })
  const [macroReferenceValues, setMacroReferenceValues] = useState({
    totalCalories: 0,

    carbsPercent: 0,
    calorieCarbs: 0,
    servingCarbs: 0,

    proteinPercent: 0,
    calorieProtein: 0,
    servingProtein: 0,

    fatsPercent: 0,
    calorieFats: 0,
    servingFats: 0
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetTable = async () => {
    setExchangeListItems(data.foodItems)
    setSelectedItemsIds(new Set())
    localStorage.clear();
    localStorage.setItem("exchangeList", JSON.stringify(data.foodItems))
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/ifct_food_items.json`)
      const data = await res.json()

      setData(data)

      if (localStorage.getItem('exchangeList') == null) {
        localStorage.setItem("exchangeList", JSON.stringify(data.foodItems))
        setExchangeListItems(data.foodItems)
      } else {
        setExchangeListItems(JSON.parse(localStorage.getItem('exchangeList')))
      }
    })();

    setSelectedItemsIds(new Set(JSON.parse(localStorage.getItem('selectedItemIds'))) || new Set())
  }, [])

  return (
    <VitalsContext value={{ vitals, setVitals }}>
      <MacroReferenceValuesContext value={{macroReferenceValues, setMacroReferenceValues}}>
        <Box sx={{ width: '100%', backgroundColor: 'white', maxWidth: '940px', marginInline: 'auto', height: "calc(100vh - 60px)" }}>
          <VitalsInfo />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="MacroWizard" centered>
              <Tab sx={{fontWeight: 500, textTransform: 'capitalize' }} label="Vitals/Macros" {...a11yProps(0)} />
              <Tab sx={{fontWeight: 500, textTransform: 'capitalize' }} label="Create Plan" {...a11yProps(1)} />
              <Tab sx={{fontWeight: 500, textTransform: 'capitalize' }} label="View Plan" {...a11yProps(2)} disabled={ !selectedItemsIds.size } />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <MacroAndVitals />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <FoodItemListing
              resetTableData={resetTable}
              exchangeListItems={exchangeListItems}
              setExchangeListItems={setExchangeListItems}
              selectedItemsIds={selectedItemsIds}
              setSelectedItemsIds={setSelectedItemsIds} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SelectedItems itemsList={exchangeListItems} />
          </CustomTabPanel>
        </Box>
      </MacroReferenceValuesContext>
    </VitalsContext>
  )
}