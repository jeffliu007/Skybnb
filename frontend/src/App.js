import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePageMain";
import SingleSpotPage from "./components/SingleSpotPage";
import UserBookingsPage from "./components/BookingsAll/UserBookingsPage.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <ProtectedRoute exact path={"/bookings"}>
            <UserBookingsPage />
          </ProtectedRoute>
          <Route exact path={`/spots/:spotId`}>
            <SingleSpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
