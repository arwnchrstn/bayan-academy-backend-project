import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const userContext = useContext(UserContext);

  //Handle logout
  const handleLogout = () => {
    userContext.dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user-backend-project");
  };

  return (
    <>
      <header>
        <nav className="navbar bg-primary navbar-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              ToGo Listings
            </Link>

            <div className="navbar-nav d-flex flex-row gap-3">
              {userContext.state.user ? (
                <>
                  <Link
                    className="text-white m-0 text-decoration-none align-self-center fw-bold"
                    to={`/${userContext.state.user}/my-listings`}
                  >
                    My Listings
                  </Link>
                  <button className="btn btn-light px-4" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-light px-4">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-light px-4">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
