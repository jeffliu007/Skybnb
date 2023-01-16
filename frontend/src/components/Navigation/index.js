import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="NavMain">
      <ul>
        <li>
          <NavLink exact to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/Nav-Logo.png"}
              alt="Nav-Logo"
              className="Home-Logo"
            />
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
