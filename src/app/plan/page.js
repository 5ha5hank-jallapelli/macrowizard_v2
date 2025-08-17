'use client'

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from "react"
import SelectedItems from '@/components/SelectedItems';
import FoodItemListing from '@/components/FoodItemListing';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`plan-tabpanel-${index}`}
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
  const [exchangeListItems, setExchangeListItems] = useState([])
  const [selectedItemsIds, setSelectedItemsIds] = useState(new Set())
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/foodItems.json`)
      const data = await res.json()

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
    <Box sx={{ width: '100%', backgroundColor: 'white', maxWidth: '940px', marginInline: 'auto', height: "calc(100vh - 60px)" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="MacroWizard" centered>
          <Tab sx={{fontWeight: 500}} label="Macro/Vitals" {...a11yProps(0)} />
          <Tab sx={{fontWeight: 500}} label="Create Plan" {...a11yProps(1)} />
          <Tab sx={{ fontWeight: 500 }} label="View Plan" {...a11yProps(2)} disabled={ !selectedItemsIds.size } />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FoodItemListing
          exchangeListItems={exchangeListItems}
          setExchangeListItems={setExchangeListItems}
          selectedItemsIds={selectedItemsIds}
          setSelectedItemsIds={setSelectedItemsIds} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SelectedItems itemsList={exchangeListItems} />
      </CustomTabPanel>
    </Box>
  )
}