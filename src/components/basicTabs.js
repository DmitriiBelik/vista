import * as React from "react";
import PropTypes from "prop-types";
import {Tabs, Tab, Typography, Box} from "@mui/material/";
import { useSelector, useDispatch } from "react-redux";
import {patientInfoFetched} from '../redux/MainSlice'
import { useState } from 'react'
import BasicTable from "./table";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const dispatch = useDispatch();
    const {presentList, quittingList} = useSelector(state => state.main)
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(patientInfoFetched({}))
    };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={`Присутствуют(${presentList.length})`} {...a11yProps(0)} />
          <Tab label={`Выбывшие(${quittingList.length})`} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicTable status='presentList' data={presentList}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <BasicTable status='quittingList' data={quittingList}/>
      </TabPanel>
    </Box>
  );
}
