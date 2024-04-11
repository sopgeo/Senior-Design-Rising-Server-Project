import React from "react";
import "../css/GenericHeader.css";

function GenericHeader({ background, user }) {
  function UCFHeader() {
    return (
      <div className="UCFHeader">
        <img src="http://localhost:3000/UCFHeaderLogo.png" height="50px" />
      </div>
    );
  }

  function NavBar() {
    let css = "background";
    if (background == false) {
      css = "see-through";
    }

    if (user === "admin") {
      return (
        <div className={css}>
          <div className="navbar">
            <div className="home"><a className="navItem" href="/home">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
            <a className="navItem" href="/manage">Manage</a>
          </div>
        </div>
      );
    } else if (user === "student") {
      return (
        <div className={css}>
          <div className="navbar">
            <div className="home"><a className="navItem" href="/home">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
            <a className="navItem" href="/upload">Upload</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className={css}>
          <div className="navbar">
          <div className="home"><a className="navItem" href="/home">Home</a></div>
            <a className="navItem" href="/search">Projects</a>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="FullHeader">
      {UCFHeader()}
      {NavBar()}
    </div>
  );
}

export default GenericHeader;
