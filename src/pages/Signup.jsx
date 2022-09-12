import React from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  //Handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const userData = {
        username: formData.get("username-signup"),
        password: formData.get("password-signup")
      };

      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + "signup",
        userData
      );
      const data = await response;

      if (data.status === 200) {
        alert("Success");
        navigate("/login", { replace: true });
      } else {
        alert(`An error occurred: ${data.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="shadow rounded p-3">
              <h2 className="text-center">Sign Up</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="username-signup" className="mt-3">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  id="username-signup"
                  name="username-signup"
                  className="form-control"
                  required
                />

                <label htmlFor="password-signup" className="mt-3">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  id="password-signup"
                  name="password-signup"
                  className="form-control"
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary form-control mt-5"
                >
                  Sign Up
                </button>

                <Link to="/login">
                  <span className="text-center mt-3 d-block">Login</span>
                </Link>
                <Link to="/">
                  <span className="text-center mt-2 d-block">
                    Back to homepage
                  </span>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
