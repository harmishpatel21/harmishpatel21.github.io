import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

// import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: "1%",
    justifyContent: 'flex-end'
  }
})

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <right>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Button onClick={evet => window.location.href="/"} variant="outlined" >HOME</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={evet => window.location.href="/journey"} variant="outlined" >JOURNEY</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={evet => window.location.href="/projects"} variant="outlined" >PROJECTS</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={evet => window.location.href="/certification"} variant="outlined" >CERTIFICATIONS</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={evet => window.location.href="/"} variant="outlined" >CONTACT ME!</Button>
        </Grid>
      </Grid>
      </right>    
    </div>
    );
  }