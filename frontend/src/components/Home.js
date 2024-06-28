import React from "react";
import "../css/Home.css";
import Header from './GenericHeader.js'

function Home() {
  return (
    <div className="home-page">
      <Header/>
      {/* header! */}
      <div className="header">
        <div className="header-logo">
          Computer Science Senior Design Projects
        </div>
        <img className="img" src={require('../images/l3harris.jpg')} alt="L3Harris"/>
      </div>

    
        <div className="white-rect">
          <div class="about">
            <h1 id="about-header">About</h1>
            <hr class="hr1"/>
            <p class="text">Welcome to the Computer Science Senior Design web portal. This is a central hub for exploring final-year projects in Computer Science department at UCF. Guest access is limited to viewing and searching projects but as a UCF senior design student, you have the opportunity to upload your team’s project. Dive into a collection of the latest ideas fostered by the innovative community of CS@UCF.</p>
          </div>
          {/* <img className="about-img" src={require('../images/some-logo.png')}/> */}
          <img className="about-img" src='../images/some-logo.png'/>
        </div>

        <div className="yellow-rect">
          {/* <img className="pres-img" src={require('../images/some-logo.png')}/> */}
          <img className="pres-img" src='../images/some-logo.png'/>
          <div class="presentations">
            <h1 id="pres-header">Presentations</h1>
            <hr class="hr2"/>
            <p>Towards the end of Senior Design 2, students showcase their projects in a 15–20-minute presentation as a testament to their dedicated research and collaboration. This is presented to a committee of three judges that witness the culmination of the seniors’ creativity and efforts.</p>
          </div>
        </div>

        <div className="black-rect">
          <div class="sponsors">
            <h1 id="sponsor-header">Sponsors</h1>
            <hr className="hr3"/>
            <p>At the beginning of the SD cycle, sponsors pitch their projects to eager students. These projects include a range of topics from artificial intelligence, frontend design, cyber security, software engineering, database systems, and more, and often projects include a mix of many topics. Teams get the opportunity to pursue a Fall-Spring, Spring-Summer, or Spring-Fall path.</p>
          </div>
          {/* <img className="sponsor-img" src={require('../images/some-logo.png')}/> */}
          <img className="sponsor-img" src='../images/some-logo.png'/>
        </div>

        <div className="white-rect2">
          <div class="sd1">
            <h1 id="sd1-header">Senior Design 1</h1>
            <hr class="hr4"/>
            <p class="text1">Senior Design 1 (SD1) marks the beginning of a rewarding journey. During this semester, students are pitched projects by sponsors and usually get placed in their first or second pick, which is how teams are selected. Going forward, biweekly TA check-in meetings are required and so are meetings with the project sponsor(s). At the end, a final detailed technical document with roughly 30 pages of contribution from each member is required to pass SD1. Each student writes about the work they have done and describes technical details about the project.</p>
          </div>

          <div class="sd2">
            <h1 id="sd2-header">Senior Design 2</h1>
            <hr class="hr5"/>
            <p class="text2">Building upon the groundwork of SD1, students continue to refine their projects and address challenges. Lectures are minimal but expectations soar. At the end of SD2, teams present their projects to a panel of judges and are evaluated on technical proficiency and presentation skills, among other criteria. Upon completion, each team has illuminated the path to new possibilities, inspiring students and judges around them, as they are sent off to embark on their next adventures.</p>
          </div>
        </div>
        
    </div>
  );
}

export default Home;