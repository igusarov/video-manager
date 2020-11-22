import React from 'react';
import { AppBar, Button, Container, createStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { AppContainerProps } from './app-container.interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    addButton: {
      backgroundColor: lightGreen[700],
    },
  }),
);

export const AppContainer: React.FC<AppContainerProps> = ({ children, onClickAddButton }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}>
            Video Manager
          </Typography>
          <Button
            onClick={onClickAddButton}
            color="primary"
            variant="contained"
            className={classes.addButton}>
            Add video
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <>{children}</>
      </Container>
    </>
  );
};
