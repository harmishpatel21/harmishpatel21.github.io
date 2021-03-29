import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Popup from 'reactjs-popup';

// import 'reactjs-popup/dist/index.css';
// import { Description } from '@material-ui/icons';

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
  popupDescription: {
    width: "100%",
    height: "100%"
  }
});

const CertificationCard = props =>  {
    const classes = useStyles();
    const { title, id, href } = props.c
//   const {imageURL, title, description, websiteURL, githubURL, technology, blogURL, youtubeURL} = props.project
//   const {imageURL, title, description, technology, githubURL} = props.project
//   const img = "images/" + imageURL

  return (
    <Card className={classes.root}>
      <CardActionArea>
        
        <Link href={href}>
            <center>
        <div 
          data-iframe-width="150" 
          data-iframe-height="270" 
          data-share-badge-id={id} 
          data-share-badge-host="https://www.youracclaim.com" /></center>
        </Link>
        
      </CardActionArea>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
           <center> { title } </center>
          </Typography>
        </CardContent>
    </Card>
  );
}

export default CertificationCard