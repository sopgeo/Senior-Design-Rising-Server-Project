import React from "react";
import "../css/Home.css";

function Home() {
  return (
    <div className="home-page">
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
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>

        <div className="black-rect">
          <div class="sponsors">
            <h1 id="sponsor-header">Sponsors</h1>
            <hr className="hr3"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          {/* <img className="sponsor-img" src={require('../images/some-logo.png')}/> */}
          <img className="sponsor-img" src='../images/some-logo.png'/>
        </div>

        <div className="white-rect2">
          <div class="sd1">
            <h1 id="sd1-header">Senior Design 1</h1>
            <hr class="hr4"/>
            <p class="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div class="sd2">
            <h1 id="sd2-header">Senior Design 2</h1>
            <hr class="hr5"/>
            <p class="text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
    </div>
  );
}

export default Home;