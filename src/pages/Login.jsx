import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { LocalStorage as ls } from "ttl-localstorage";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  //Handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const userData = {
        username: formData.get("username-login"),
        password: formData.get("password-login")
      };

      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + "/user/login",
        userData
      );
      const data = await response;
      console.log(data);

      if (data.status === 200) {
        userContext.dispatch({ type: "LOGIN", payload: data.data.username });
        ls.put("user-backend-project", data.data.username, 86400000);
        navigate(-1, { replace: true });
      } else {
        alert(`${data.statusText}`);
        e.target.reset();
      }
    } catch (error) {
      console.error(
        error.response.status,
        error.response.statusText,
        error.response.data
      );
      alert(error.response.data);
      e.target.reset();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="shadow rounded p-3">
              <h2 className="text-center">Login</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="username-login" className="mt-3">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  id="username-login"
                  name="username-login"
                  className="form-control"
                  required
                />

                <label htmlFor="password-login" className="mt-3">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  id="password-login"
                  name="password-login"
                  className="form-control"
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary form-control mt-5"
                >
                  Login
                </button>

                <Link to="/signup">
                  <span className="text-center mt-3 d-block">Signup</span>
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

export default Login;
