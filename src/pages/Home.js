//import { data, contactItems, blogPosts, skills } from "../services/data";
import {data, contactItems, skills} from "../services/data";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Icon from "@material-ui/core/Icon";
// import Link from "@material-ui/core/Link";
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	paper: {
		minHeight: "65px",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
	},
	media: {
		width: "100%",
		minHeight: 250,
		minWidth: 250,
	},
	skills: {
		fontVariant: "all-small-caps",
		fontSize: "large",
		border: "thin",
		borderStyle: "dotted",
		borderRadius: "5px",
		margin: "5px 5px 5px 8px",
		padding: "5px",
		background: "#dbe9f1",
		fontWeight: "bold",
		textDecoration: "none",
		color: "#0a3f5e",
	},
	contact: {
		margin: "20px 10px 0px 0px",
	},
	items: {
		margin: "5px",
	},
	links: {
		color: "black",
		borderBottomStyle: "dotted",
		border: "thin",
	},
	header: {
		textAlign: "left",
		padding: "5%",
		margin: "1%",
	},
});

export default function Home() {
	const { firstName, headline, profilePic } = data;
	const profilepic = "images/" + profilePic;
	const classes = useStyles();

	return (
		<Grid container spacing={5} className={classes.root}>
			<Grid item xs={12}>
				<Card>
					<Grid container className={classes.root}>
						<Grid item sm={4} className={classes.media}>
							<CardMedia className={classes.media} image={profilepic} />
						</Grid>
						<Grid item sm={6}>
							<CardContent className={classes.header}>
								<Typography gutterBottom variant="h3" component="h3">
									Hi, I'm {firstName}
								</Typography>
								<Typography variant="body1" gutterBottom>
									{headline}
								</Typography>
								{contactItems.map((item) => (
									<Button
										variant="contained"
										color="default"
										className={classes.contact}
										href={item.href}
										key={contactItems.indexOf(item)}
										aria-label={item.text}
									>
										<Icon className={item.icon} />
									</Button>
								))}
							</CardContent>
						</Grid>
					</Grid>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Card className={classes.root}>
					<CardContent>
                    <Typography variant="h5" component="h2">
							Profile Summary
						</Typography>
						<Typography variant="body2" gutterBottom>
                            <ul>
                                <li>
                                    I possess a strong <strong>quantitative as well as ML/DL background</strong>, with bachelor's in <strong>computer
                                    science with majors in Big Data and Analytics</strong> and <strong>master's in Applied Computing with AI specialization.</strong> 
                                    I take pride in my ability to manipulate <code>large datasets</code>, <code>robust predictive analytics</code>, and turning them into actionable 
                                    <strong> solutions and strategies for business.</strong>
                                </li>
                                <br/>
                                <li>
                                <strong>2+ years</strong> of hands-on experience as a <code>data scientist</code> & <code>big data technology</code>.
                                </li>
                                <br/>
                                <li>
                                    Strong analytical skills using <code>data Visualization</code> & <code>data Mining tools</code>, <code>core understanding of natural language
                                    processing</code> and <code>data manipulation</code> using different and powerful frameworks gained during industry experience.
                                </li>
                                <br/>
                                <li>
                                    Experience working with <code>decision based modeling</code>, <code>bayesian/probabilistic methods</code>, <code>gradient boosting method</code>,
                                    <code>advance statistical modelling</code>, and <code>hypothesis testing</code> along with <code>predictive, prescriptive & quantitative analysis</code>.
                            
                                </li>
                                <br/>
                                <li>
                                    <strong>Self-learning, adaptive, ability to boil down complex subjects to simple terms</strong> and understanding of advance
                                    concepts for data science, machine learning, deep learning as well as software engineering methodologies.
                                </li>
                            </ul>
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card className={classes.root}>
					<CardContent>
						<Typography variant="h5" component="h2">
							Technical Skills
						</Typography>
						<CardActions className={classes.paper}>
							{skills.map((skill) => (
								<a href={skill.href} className={classes.skills}>
									<span key={skill.name}>
										<code>{skill.name}</code>
									</span>
								</a>
							))}
						</CardActions>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}