import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { OpenModalButtonCreateForm } from "../OpenModalButton";
import SpotModalForm from "../CreateSpotModal/SpotModalForm";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const ulRef = useRef();

  const demoLogin = () => {
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-container">
      <button onClick={openMenu} className="profButton">
        <div className="profile-button-combined">
          <i className="fa-solid fa-bars" id="solid-bars" />
          <i className="fas fa-user-circle" />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="profile-dropdown-li">{user.username}</li>
            <li className="profile-dropdown-li">
              {user.firstName} {user.lastName}
            </li>
            <li className="profile-dropdown-li pd-email">{user.email}</li>
            <li className="profile-dropdown-li">
              <OpenModalButtonCreateForm
                buttonText="Skybnb your home"
                modalComponent={<SpotModalForm />}
                className="profile-create-spot"
                onButtonClick={closeMenu}
              />
            </li>
            <li className="profile-dropdown-li">
              <NavLink
                exact
                to="/bookings"
                className="profile-dropdown-li-bookings"
              >
                Bookings
              </NavLink>
            </li>
            <li className="profile-dropdown-li pd-logout" onClick={logout}>
              <div>Log Out</div>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                className="log-in-button"
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                className="sign-up-button"
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li className="before-demo">
              <button className="log-sign-demo" onClick={demoLogin}>
                Demo
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
