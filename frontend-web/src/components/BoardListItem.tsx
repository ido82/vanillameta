import React from 'react';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  BarChart,
  BubbleChart,
  Dashboard,
  Delete,
  Edit,
  PieChart,
  ScatterPlot,
  StackedLineChart,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import DonutChart from '@/widget/modules/piechart/DonutChart';

const tableBorder = '1px solid #DADDDD';

function BoardListItem(props) {
  const { postItem, message, handleDeleteSelect } = props;

  const location = useLocation();
  const pathname = location.pathname;

  const dateData = data => {
    const userDate = new Date(data);
    const year = userDate.getFullYear();
    const month = userDate.getMonth() + 1;
    const date = userDate.getDate();
    return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
  };

  let iconType;
  switch (postItem.componentType) {
    case 'DASHBOARD':
      iconType = <Dashboard />;
      break;
    case 'CHART_LINE':
      iconType = <StackedLineChart />;
      break;
    case 'CHART_BAR':
      iconType = <BarChart />;
      break;
    case 'CHART_BUBBLE':
      iconType = <BubbleChart />;
      break;
    case 'CHART_SCATTER':
      iconType = <ScatterPlot />;
      break;
    case 'CHART_PIE':
      iconType = <PieChart />;
      break;
    case 'CHART_DONUT':
      iconType = <DonutChart />;
      break;
    default:
      break;
  }

  const handleDelete = () => {
    handleDeleteSelect(postItem);
  };

  return (
    <ListItem
      key={postItem.id}
      secondaryAction={
        <React.Fragment>
          <IconButton
            size="large"
            component={RouterLink}
            to={`modify?id=${postItem.id}&title=${postItem.title}`}
            state={{ from: pathname }}
          >
            <Edit />
          </IconButton>
          <IconButton size="large" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </React.Fragment>
      }
      disablePadding
      sx={{
        borderBottom: tableBorder,
        '&:last-of-type': { borderBottom: 0 },
      }}
    >
      <ListItemButton sx={{ py: 0.8 }} component={RouterLink} to={`${postItem.id}`} state={{ from: pathname }}>
        {postItem.type ? <ListItemIcon>{iconType}</ListItemIcon> : ''}
        <ListItemText
          primary={postItem.title}
          primaryTypographyProps={{ fontWeight: 500 }}
          secondary={dateData(postItem.updatedAt)}
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'space-between',
            ml: { xs: 0, sm: 2 },
            mr: 12,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default BoardListItem;
