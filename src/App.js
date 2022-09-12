import React from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import MyListings from "./pages/MyListings";
import { RequireAuth } from "./components/RequireAuth";
import IndividualListing from "./pages/IndividualListing";

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" exact index element={<LandingPage />} />
          <Route
            path="/login"
            exact
            element={
              <RequireAuth status="public">
                <Login />
              </RequireAuth>
            }
          />
          <Route
            path="/signup"
            exact
            element={
              <RequireAuth status="public">
                <Signup />
              </RequireAuth>
            }
          />
          <Route
            path="/:user/my-listings"
            exact
            element={
              <RequireAuth status="protected">
                <MyListings />
              </RequireAuth>
            }
          />
          <Route
            path="/listing/:id/details"
            exact
            element={<IndividualListing />}
          />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
