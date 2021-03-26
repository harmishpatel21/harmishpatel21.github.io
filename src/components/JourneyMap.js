import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import { journey } from '../services/data';
import {  education } from '../services/data';


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
    popupDescription: {
      width: "100%",
      height: "100%"
    }
  });

const JourneyMap = props => {
    // const classes = useStyles();
    // let doThis = "";
    // console.log(props)
    const { label, title, degree, companyName, date, location, technology, description, 
            specialization, university, coursework } = props.j
    if (label === "School"){
        return(
            <VerticalTimelineElement
                className="vertical-timeline-element--school"
                date={date}
                iconStyle={{ background: 'rgb(33,150,243)', color: '#fff' }}
                icon={<SchoolIcon />}
                >
                    <h1 className="vertical-timeline-element-title">{degree} in { title }</h1>
                    <h3 className="vertical-timeline-element-specialization">Specialization in { specialization }</h3>
                    <h3 className="vertical-timeline-element-subtitle">{ location }</h3>
                    <p><strong>Relevant coursework:</strong>
                        {coursework}
                    </p>
            </VerticalTimelineElement>
        )
    }else{
        return(
            <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date={ date }
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                >
                    {/* <h1 className="vertical-timeline-element-title">Data Scientist Intern</h1> */}
                    <h1 className="vertical-timeline-element-title">{ title }</h1>
                    <h4 className="vertical-timeline-element-subtitle">{ companyName} { location }</h4>
                    <p><strong>Technical Stack:</strong>
                        {technology}
                    </p>
                    {description.map((a) =>
                        <p>{a}</p>
                    )}
            </VerticalTimelineElement>
        )
    }
}

export default JourneyMap

