import React from 'react';
import { FaBriefcase } from "react-icons/fa"

const TimelineItem = ({ item }) => {
    return (
        <div className="timeline-item">
            <div className="timeline-icon">
                <FaBriefcase />
            </div>
            <div className="timeline-content">
                <h2><a href={item.src}>{item.title}</a></h2>
                <p>{item.date}</p>
                <p>{item.description}</p>
            </div>
        </div>
    );
};

export default TimelineItem;
