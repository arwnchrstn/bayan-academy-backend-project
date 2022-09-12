import React, { useState, useEffect, useContext, useReducer } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BiArrowBack } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { convertDateToString } from "../config/date_convert";
import { UserContext } from "../context/UserContext";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { reducer } from "../reducer/reducer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const IndividualListing = () => {
  const userContext = useContext(UserContext);
  const [listing, setListing] = useState();
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ratingState, dispatch] = useReducer(reducer, {
    rating: 0,
    description: ""
  });
  const { id } = useParams("id");
  const navigate = useNavigate();

  //submit review
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ratingState.rating) alert("Please add a rating");
    else if (!ratingState.description) alert("Please add a rating description");
    else {
      const review = {
        username: userContext.state.user,
        rating: ratingState.rating,
        description: ratingState.description
      };

      (async () => {
        try {
          const response = await axios.post(
            process.env.REACT_APP_API_SERVER + `/listing/review/${id}`,
            review
          );
          const data = await response.data;

          setListing(data);
          dispatch({ type: "update-rating", payload: 0 });
          dispatch({ type: "update-description", payload: "" });
        } catch (error) {
          console.error(error, error.message);
          alert(error.message);
        }
      })();
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_SERVER + `/listing`
        );
        const data = await response.data;

        setListing(...data.filter((listing) => listing._id === id));
        setAllListings([...data.filter((listing) => listing._id !== id)]);
        setLoading(false);
      } catch (error) {
        console.error(error, error.message);
        alert(error.message);
      }
    })();
  }, [id]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{listing?.name.toUpperCase()}</title>
        </Helmet>
      </HelmetProvider>

      <Navbar />
      <div className="container">
        {loading ? (
          <h3 className="text-center mt-3">Loading...</h3>
        ) : (
          <>
            <p
              role="button"
              className="fs-5 mt-4 d-block text-primary m-0 fw-bold"
              onClick={() =>
                userContext.state.user
                  ? navigate(-1, { replace: true })
                  : navigate("/", { replace: true })
              }
            >
              <BiArrowBack /> Go back
            </p>
            <div className="row mt-4 mb-5">
              <div className="col-12">
                <div className="text-center">
                  <img
                    src={listing?.image}
                    alt={listing?.name}
                    className="img-fluid"
                    style={{ aspectRatio: "16/9", height: "400px" }}
                  />
                </div>
                <h2 className="mt-4">{listing?.name.toUpperCase()}</h2>
                <h5>
                  Posted by:{" "}
                  <span className="fst-italic">{listing?.username}</span>
                </h5>
                <h5>
                  Date posted: {convertDateToString(listing?.date_posted)}
                </h5>
                <h5>
                  <FiMapPin /> {listing?.location.place}
                </h5>
                <h3 className="mt-4">Description</h3>
                <p>{listing?.description}</p>

                <div style={{ height: "500px", width: "100%" }}>
                  <MapContainer
                    center={[listing?.location.lat, listing?.location.long]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{
                      height: "100%",
                      width: "100%"
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[listing?.location.lat, listing?.location.long]}
                      icon={
                        new Icon({
                          iconUrl: markerIconPng,
                          iconSize: [30, 46],
                          iconAnchor: [12, 41]
                        })
                      }
                    >
                      <Popup>
                        <Link to={`/listing/${listing?._id}/details`}>
                          {listing?.location.place} (Click to show listing)
                        </Link>
                      </Popup>
                    </Marker>

                    {allListings?.map((listing, idx) => (
                      <Marker
                        position={[
                          listing?.location.lat,
                          listing?.location.long
                        ]}
                        icon={
                          new Icon({
                            iconUrl: markerIconPng,
                            iconSize: [25, 41],
                            iconAnchor: [12, 41]
                          })
                        }
                        key={idx}
                      >
                        <Popup>
                          <Link to={`/listing/${listing?._id}/details`}>
                            {listing?.location.place} (Click to show listing)
                          </Link>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                <h3 className="mt-5">Reviews</h3>
                {userContext.state.user ? (
                  <form onSubmit={handleSubmit} className="mb-4">
                    <h4 className="d-inline">Add Rating: </h4>
                    {Array(5)
                      .fill("")
                      .map((star, idx) => (
                        <h2 className="d-inline" key={idx}>
                          <input
                            type="radio"
                            name="rating"
                            id={`rating${idx}`}
                            value={idx + 1}
                            onClick={(e) =>
                              dispatch({
                                type: "update-rating",
                                payload: e.target.value
                              })
                            }
                            hidden
                          />

                          <label htmlFor={`rating${idx}`}>
                            <FaStar
                              className="pb-1"
                              color={
                                idx + 1 <= ratingState.rating
                                  ? "#DEA100"
                                  : "lightgray"
                              }
                            />
                          </label>
                        </h2>
                      ))}
                    <textarea
                      name="review"
                      id=""
                      cols="30"
                      rows="5"
                      className="form-control mt-3"
                      placeholder="Add Review"
                      onChange={(e) =>
                        dispatch({
                          type: "update-description",
                          payload: e.target.value
                        })
                      }
                      value={ratingState.description}
                      required
                    ></textarea>

                    <button className="btn btn-primary mt-3 form-control">
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <div className="text-center mb-4 border border-1 rounded py-4">
                    <h3>You must login to post a review</h3>
                    <Link to="/login" className="btn btn-primary mt-3">
                      Login
                    </Link>
                  </div>
                )}
                {listing?.reviews.length === 0 && (
                  <h3 className="text-center">No reviews yet</h3>
                )}
                {listing?.reviews.length !== 0 && (
                  <h5 className="text-end">
                    Overall Rating:{" "}
                    {(
                      listing?.reviews.reduce((prev, current) => {
                        return prev + current.rating;
                      }, 0) / listing?.reviews.length
                    ).toFixed(1)}
                    /5 Stars
                  </h5>
                )}
                {listing?.reviews.map((review, idx) => (
                  <div className="shadow px-4 py-2 mb-2" key={idx}>
                    <h4>{review.username}</h4>
                    <p className="m-0 mb-1">
                      {convertDateToString(review.date_reviewed)}
                    </p>
                    <p className="m-0 mb-1 d-inline">Rating: </p>
                    {Array(5)
                      .fill("")
                      .map((star, idx) => (
                        <FaStar
                          color={
                            idx + 1 <= review.rating ? "#DEA100" : "lightgray"
                          }
                          className="pb-1"
                          key={idx}
                        />
                      ))}

                    <p className="m-0 mb-1">
                      <strong>Review:</strong> {review.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IndividualListing;
