import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "space-between"
  },
  caps: {
    fontVariant: "all-small-caps"
  },
  content: {
    alignContent: "top"
  },

});

const CertificationCard = props =>  {
    const classes = useStyles();
    const { title, id, href } = props.c

    useEffect(() => {
    const timeout = setTimeout(() => {
    //    setCount(1);
     }, 1000);
   },[]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={href}>
        <center>
            <div 
                data-iframe-width="150" 
                data-iframe-height="270" 
                data-share-badge-id={ id } 
                data-share-badge-host="https://www.youracclaim.com" />
        </center>
        </Link>
        
      </CardActionArea>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h3">
           <center> { title } </center>
          </Typography>
        </CardContent>
    </Card>
  );
}

export default CertificationCard