import React from "react";
import Bhuvi from "../image/Bhuvi.png"

const About =()=>{
    return(
        <section className='about'>
      <div className='about-intro'>
        
        <h5>ABOUT</h5>
        <h2>Let me introduce myself.</h2>
        <img className='bhuvi' src={Bhuvi} />
        <div className="row about-content">
            <div className="col-six  center">
                <h3>Profile</h3>
                <p className="p-conten">A proactive software developer with 3 years of experience,
              graduated from PSG College of Technology. Skilled in React.js,
              Node.js, REST APIs, Java, and proficient in JavaScript, HTML, and
              CSS.</p>
                <ul class="info-list">
   				<li>
   					<strong>Fullname:</strong>
   					<span>Bhuvanesh S</span>
   				</li>
   				<li>
   					<strong>Birth Date:</strong>
   					<span>October 9th, 1999</span>
   				</li>
   				<li>
   					<strong>Website:</strong>
   					<span><a href="#">https://bhuvanesh-portfolio.onrender.com</a></span>
   				</li>
                    <li>
                        <strong>Email:</strong>
                        <span>bhuvanesh101999@gmail.com</span>
                    </li>
   			</ul>
            </div>
            <div className="col-six center">
                <h3>Skills</h3>
                <div className="skill">
                <p>
                <strong>Languages:</strong><br />
                <b>English :</b><br /> Read, Write, Speak : <i>Native</i><br />
                <b>Tamil :</b><br /> Read, Write, Speak : <i>Mother Tongue</i><br />
                </p>
                <ul class="skill-bars">
                    <li>
                        <strong>React</strong>
                    </li>
                    <li>
                        <strong>Node</strong>
                    </li>
                    <li>
                        <strong>Java</strong>
                    </li>
                    <li>
                        <strong>JavaScript</strong>
                    </li>   
                </ul>
                </div>
            </div>
        </div>
        </div>
        
        </section>

    );
}

export default About;