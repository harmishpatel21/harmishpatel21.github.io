import React from 'react';
import { journey } from '../services/data';
import JourneyMap from '../components/JourneyMap'; 
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';



export default function Journey() {
    return (
        <VerticalTimeline>
            { journey.map((j) => 
                <JourneyMap j = { j } />
            )}    
        </VerticalTimeline>
    )
}
