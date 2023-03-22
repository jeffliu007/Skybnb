import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePageMain";
import SingleSpotPage from "./components/SingleSpotPage";
import UserBookingsPage from "./components/BookingsAll/UserBookingsPage.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path={"/bookings"}>
            <UserBookingsPage />
          </Route>
          <Route exact path={`/spots/:spotId`}>
            <SingleSpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
