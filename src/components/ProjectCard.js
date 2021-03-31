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
import '../components/temp.css';
// import 'reactjs-popup/dist/index.css';


// import 'reactjs-popup/dist/index.css';
// import { Description } from '@material-ui/icons';



const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: 'flex',
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

const ProjectCard = props =>  {
  const classes = useStyles();
//   const {imageURL, title, description, websiteURL, githubURL, technology, blogURL, youtubeURL} = props.project
  const {imageURL, title, description, technology, githubURL} = props.project
  const img = "images/" + imageURL

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={githubURL}>
        <CardMedia
          component="img"
          alt={description}
          image={img}
          title={title}
          height="250px"
        />
        </Link>
      </CardActionArea>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
           <center> {title} </center>
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.caps}>
           <center>{technology}</center> 
          </Typography>
          <br/>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.popup}>
          <center>
              <Popup 
              className="my-popup"
              trigger={<Button className="button" variant="contained">Description</Button>} 
              wide='very'
              modal='true' 
              >
              <div>
                <ul>
                  {description.map(a => 
                    <li>
                      {a}
                    </li> )}
                </ul>
              </div>
              </Popup>
            </center>
          </Typography>
        </CardContent>
      <CardActions>
        {githubURL ? <Button size="small" color="default" href={githubURL} aria-label="visit-external-website">
          <Icon className="fas fa-external-link-alt"/>
        </Button> : null}

        <Button size="small" color="default" href={githubURL} aria-label="github">
          <Icon className="fa fa-github"/>
        </Button>

      </CardActions>
    </Card>
  );
}

export default ProjectCard