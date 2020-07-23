import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'gatsby';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedList = ({ pathname, section, openByDefault }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(openByDefault);

  useEffect(() => {
    if (section.items.find((item) => item.path === pathname) && !open) setOpen(true);
  }, [pathname]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component={'nav'}
      aria-labelledby={'nested-list-subheader'}
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={section.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component={'div'} disablePadding>
          {
            section.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
              >
                <ListItem
                  button
                  className={classes.nested}
                  selected={pathname === item.path}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))
          }

        </List>
      </Collapse>
    </List>
  );
};

NestedList.propTypes = {
  openByDefault: PropTypes.bool,
  pathname: PropTypes.string,
  section: PropTypes.object,
};

NestedList.defaultProps = {
  openByDefault: false,
  pathname: '',
  section: {},
};

export default NestedList;
