import { Paper, Box, Tabs, Tab, Typography } from '@mui/material';
import React from 'react';
import Spotify from '../Spotify';
import Udemy from '../Udemy';
import Overview from './Overview';
import Planner from './Planner';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import YouTube from '../YouTube';
import { Route } from 'react-router-dom';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs={
  overview: (<TabPanel>
          <Overview />
        </TabPanel>),
  spotify: (<TabPanel>
          <Spotify />
        </TabPanel>),
  udemy: (<TabPanel>
          <Udemy />
        </TabPanel>),
  youtube: (<TabPanel>
          <YouTube />
        </TabPanel>)
}

const getLocNumber=(pathname)=>{
  switch (pathname) {
      case 'overview':
        return 0;
      case 'spotify':
        return 1;
      case 'udemy':
        return 2;
        case 'youtube':
          return 3;
      default:
        return 0
    }
}

export const Dashboard = () => {
  const location = useLocation();
  const [value, setValue] = useState(()=>getLocNumber(location.pathname.split("/")[2]));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='dashboard'>
      <Paper sx={{ marginRight: "80px"}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Overview" {...a11yProps(0)} component={Link} to="overview" />
            <Tab label="Spotify" {...a11yProps(1)} component={Link} to="spotify" />
            <Tab label="Udemy" {...a11yProps(2)} component={Link} to="udemy" />
            <Tab label="YouTube" {...a11yProps(3)} component={Link} to="youtube" />
          </Tabs>
        </Box>
        {tabs[location.pathname.split("/")[2]]}
        {/* 
        <TabPanel value={value} index={1}>
          <Spotify />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Udemy />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <YouTube />
        </TabPanel> */}
      </Paper>
    </div>
  );
};
