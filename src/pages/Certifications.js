import React from 'react';
import { certification } from '../services/certification';
import CertificationCard from '../components/CertificationCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexGrow: 1,
  }
});

export default function Certifications() {
  const classes = useStyles();
 
    return (
            <Grid container spacing={2} className={classes.root}>
            {certification.map(c => 
            <Grid item sm={4} key={certification.indexOf(c)}>
              <CertificationCard c={c} />
            </Grid>)}
          </Grid>   
  );
}