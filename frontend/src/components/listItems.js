import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import {Link} from "react-router-dom";
export const mainListItems = (
  <React.Fragment>
    <Link to="CTR">
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="CTR" />
        </ListItemButton>
    </Link>
    <Link to="EvPM">
        <ListItemButton>
            <ListItemIcon>
                <StackedLineChartIcon />
            </ListItemIcon>
            <ListItemText primary="EvPM" />
        </ListItemButton>
    </Link>
    <Link to="table">
        <ListItemButton>
            <ListItemIcon>
                <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Table" />
        </ListItemButton>
    </Link>
  </React.Fragment>
);
