import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="Nav-Main">
      <div className="Nav-Home-Button">
        <NavLink exact to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/Nav-Logo.png"}
            alt="Nav-Logo"
            className="Home-Logo"
          />
        </NavLink>
      </div>
      {isLoaded && (
        <div className="Nav-Profile-Button">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
