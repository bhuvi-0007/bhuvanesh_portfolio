import React from 'react';
import TimelineItem from './TimelineItem';

const Timeline = ({ items }) => {
    return (
        <div className="timeline">
            {items.map((item, index) => (
                <TimelineItem key={index} item={item} />
            ))}
        </div>
    );
};

export default Timeline;
