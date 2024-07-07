import React from "react";

import Timeline from "./TimeLine";

const Resume = () => {
    const timelineItems = [
        {
            title: 'Frontend Developer at Solartis Technology Services Pvt.Ltd',
            date: '2021 - Present(2024)',
            description: 'Worked on developing and maintaining the insurance product based UI.',
            src:'https://www.solartis.com/'
        },
        {
            title: 'Bachelor of Engineering at PSG College of Technology',
            date: '2017 - 2021',
            description: 'Completed my Bachelors at PSG College of Technology with an excellent academic background',
            src:'https://www.psgtech.edu/'
        },
        {
            title: 'Scholling at Bharathidasan matriculation higher secondary school',
            date: '2005 - 2017',
            description: 'Completed my schooling at Bharathidasan matriculation higher secondary school with an excellent academic background',
            src:'https://bdmsschool.org/'
        }
    ];
    return ( 
        <section id='resume'>
            <div class="row section-intro">
                <div class="col-twelve">
                    <h5>RESUME</h5>
                </div>
                <div class="col-twelve resume-header">
                    <h2>Experience & Education Timeline</h2>
                </div>
            </div>
            <Timeline items={timelineItems} />
        </section>
    );
}

export default Resume;