import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface CustomFabProps extends FabProps {
  active: boolean;
}

const useStyles = makeStyles<Theme, { active: boolean }>((theme) => ({
  fab: {
    backgroundColor: (props) => (props.active ? theme.palette.common.white : theme.palette.primary.main),
    color: (props) => (props.active ? theme.palette.primary.main : theme.palette.common.white),
    border: (props) => (props.active ? `1px solid ${theme.palette.primary.main}` : 'none'),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),

    '&:hover': {
      backgroundColor: (props) => (props.active ? theme.palette.grey[100] : theme.palette.primary.dark),
    },
  },
}));

export const CustomFab = ({ active, children, ...props }: CustomFabProps) => {
  const classes = useStyles({ active });
  return (
    <Fab variant="extended" className={classes.fab} {...props}>
      {children}
    </Fab>
  );
};
