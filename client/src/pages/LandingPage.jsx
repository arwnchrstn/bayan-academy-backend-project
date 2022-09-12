import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { convertDateToString } from "../config/date_convert";
import { FiMapPin } from "react-icons/fi";
import { HelmetProvider, Helmet } from "react-helmet-async";

const LandingPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userContext = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get("/listing");
        const data = await response.data;

        setListings((prev) => [...prev, ...data]);
        setLoading(false);
      } catch (error) {
        console.error(error, error.message);
        alert(error.message);
      }
    })();
  }, []);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ToGo Listings | All Listings</title>
        </Helmet>
      </HelmetProvider>

      <Navbar />

      <div className="container">
        {loading ? (
          <h2 className="text-center mt-3">Loading...</h2>
        ) : (
          <>
            {userContext.state.user && (
              <h1 className="mt-3 mb-5">Welcome, {userContext.state.user}!</h1>
            )}

            <h2 className="mt-3 fw-bold text-center">All Listings</h2>

            <div className="row mt-4 mb-5">
              {listings.map((listing, idx) => (
                <div className="col-md-6 col-lg-3 mt-3 d-flex" key={idx}>
                  <div className="card">
                    <img
                      src={listing.image}
                      alt="..."
                      style={{ aspectRatio: "16/9", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-uppercase">
                        {listing.name}
                      </h5>
                      <h6>
                        by{" "}
                        <span className="fst-italic">{listing.username}</span>
                      </h6>
                      <h6>{convertDateToString(listing.date_posted)}</h6>
                      <h6>
                        <FiMapPin /> {listing.location.place}
                      </h6>
                      <p className="card-text mt-3">
                        {listing.description.substr(0, 150)}...
                      </p>

                      <Link
                        to={`/listing/${listing._id}/details`}
                        className="btn btn-primary mt-auto"
                      >
                        See Listing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LandingPage;
