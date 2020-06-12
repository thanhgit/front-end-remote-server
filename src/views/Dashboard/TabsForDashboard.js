import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CallMadeIcon from '@material-ui/icons/CallMade';
import IconButton from '@material-ui/core/IconButton';

import { render } from 'react-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderHeader = (data) => {
      return data.map((item, key) => {
        return <Tab label={item[1]}{...a11yProps(0)} />
      } )
  }

  const renderContent = (data, num) => {
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <iframe src={data[num][0]} height="800" width="100%"></iframe>
            </GridItem>
        </GridContainer>
    )
    
  }

  const handleClickNavigation = () => {
    window.open(
        `${data[value][0]}`,
        '_blank' // <- This is what makes it open in a new window.
      );
  }

  const { data } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {renderHeader(data)}
        </Tabs>
      </AppBar>
      <div style={{float: "right", padding: "20px 20px"}}>
            <IconButton size="small" edge="end" color="primary" style={{backgroundColor: "#000"}} onClick={handleClickNavigation}><CallMadeIcon /></IconButton>
        </div>
      <TabPanel value={value} index={value}>
        {renderContent(data, value)}
      </TabPanel>
    </div>
  );
}
