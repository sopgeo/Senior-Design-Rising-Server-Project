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

  function NavBar(background, user) {
    let css = "background";
    if (background == false) {
      css = "see-through";
    }

    if (user === "admin") {
      return (
        <div className={css}>
        <a href="/home">Home</a>
        <a href="/search">Projects</a>
        <a href="/upload">Upload</a>
        <a href="/manage">Manage</a>
        </div>
      );
    } else if (user === "student") {
      return (
        <div className={css}>
        <a href="/home">Home</a>
        <a href="/search">Projects</a>
        <a href="/upload">Upload</a>
        </div>
      );
    } else {
      return (
        <div className={css}>
          <a href="/home">Home</a>
          <a href="/search">Projects</a>
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
