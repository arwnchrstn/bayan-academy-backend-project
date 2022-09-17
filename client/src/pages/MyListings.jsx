import React, { useState, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { convertDateToString } from "../config/date_convert";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Modal, Spinner } from "react-bootstrap";
import { reducer } from "../reducer/reducer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const MyListings = () => {
  const { user } = useParams("user");
  const listingStateInitial = {
    name: "",
    image: "",
    username: user,
    description: "",
    location: {
      place: "",
      lat: "",
      long: ""
    }
  };
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState();
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [listingState, dispatch] = useReducer(reducer, listingStateInitial);

  //get location coordinates
  const getCoordinates = async () => {
    try {
      setLoadingLocation(true);
      const response = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_STACK_ACCESS_KEY}&query=${listingState.location.place}`
      );
      const data = await response.data.data[0];

      dispatch({ type: "update-location-latitude", payload: data.latitude });
      dispatch({ type: "update-location-longitude", payload: data.longitude });
    } catch (error) {
      console.log(error);
      console.error(
        error.response.data.error.code +
          " - " +
          error.response.data.error.message
      );
      alert(
        error.response.data.error.code +
          "\n" +
          error.response.data.error.message
      );
    }
    setLoadingLocation(false);
  };

  //handle location on change to change lat and long values
  const locationOnChange = (e) => {
    dispatch({
      type: "update-listing-location",
      payload: e.target.value
    });
    dispatch({ type: "update-location-latitude", payload: "" });
    dispatch({ type: "update-location-longitude", payload: "" });
  };

  //Add new listing
  const handleAddListing = async (e) => {
    e.preventDefault();

    try {
      if (!listingState.location.lat || !listingState.location.long) {
        alert(
          'Please click "Get Coords" button to get the coordinate of your specified location '
        );
        return;
      }
      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + "/listing/addnew",
        listingState
      );
      const data = await response.data;

      setListings((prev) => [...prev, data]);
      handleHide();
    } catch (error) {
      console.error(error.response.data);
      console.error(error + " - " + error.message);
      alert(error.message);
    }
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
    dispatch({ type: "reset-to-initial", payload: listingStateInitial });
  };

  const handleShowMap = () => {
    setShowMap(true);
    setShow(false);
  };
  const handleHideMap = () => {
    setShowMap(false);
    setShow(true);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_SERVER + `/listing/${user}`
        );
        const data = await response.data;

        setListings((prev) => [...prev, ...data]);
        setLoading(false);
      } catch (error) {
        console.error(error, error.message);
        alert(error.message);
      }
    })();
  }, [user]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ToGo Listings | My Listings</title>
        </Helmet>
      </HelmetProvider>

      <Navbar />
      <div className="container">
        {loading ? (
          <h2 className="text-center mt-3">Loading...</h2>
        ) : (
          <>
            <Link to="/" className="mt-3 d-block">
              <p className="fs-5">Back to homepage</p>
            </Link>
            <h2 className="mt-3 fw-bold text-center">My Listings</h2>

            <div className="text-end mt-4">
              <button className="btn btn-primary px-4" onClick={handleShow}>
                Add New Listing
              </button>
            </div>

            <div className="row mt-3 mb-5">
              {listings.length === 0 && (
                <h3 className="text-center">No Listings Available</h3>
              )}
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

      <Modal
        show={show}
        onHide={handleHide}
        size="md"
        backdrop={`${loadingLocation ? "static" : true}`}
      >
        <Modal.Body>
          <h5>New Listing</h5>

          <form className="mt-4" onSubmit={handleAddListing}>
            <label htmlFor="name">
              <strong>Title</strong>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={listingState.name}
              onChange={(e) =>
                dispatch({
                  type: "update-listing-name",
                  payload: e.target.value
                })
              }
              required
            />

            <label htmlFor="image" className="mt-2">
              <strong>Listing Image (URL)</strong>
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={listingState.image}
              className="form-control"
              onChange={(e) =>
                dispatch({
                  type: "update-listing-image",
                  payload: e.target.value
                })
              }
              required
            />

            <label htmlFor="description" className="mt-2">
              <strong>Description</strong>
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={listingState.description}
              className="form-control"
              rows="5"
              onChange={(e) =>
                dispatch({
                  type: "update-listing-description",
                  payload: e.target.value
                })
              }
              required
            />

            <label htmlFor="location" className="mt-2">
              <strong>Location</strong>
            </label>
            <div className="input-group">
              <input
                type="text"
                name="location"
                id="location"
                value={listingState.location.place}
                className="form-control"
                onChange={locationOnChange}
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={getCoordinates}
                disabled={loadingLocation}
              >
                Get Coords
              </button>
            </div>
            {loadingLocation && (
              <p className="fw-bold m-0 mb-2 text-primary">
                Loading. This may take some time...{" "}
                <Spinner animation="border" variant="primary" size="sm" />
              </p>
            )}

            <label htmlFor="lat" className="mt-2">
              <strong>Latitude</strong>
            </label>
            <input
              type="number"
              name="lat"
              id="lat"
              defaultValue={listingState.location.lat}
              className="form-control"
              disabled
              required
            />

            <label htmlFor="long" className="mt-2">
              <strong>Longitude</strong>
            </label>
            <input
              type="number"
              name="long"
              id="long"
              defaultValue={listingState.location.long}
              className="form-control"
              disabled
              required
            />

            {listingState?.location.lat && listingState?.location.long && (
              <button
                className="btn btn-primary mt-3 d-block ms-auto"
                onClick={handleShowMap}
                type="button"
                disabled={loadingLocation}
              >
                See Map
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-5 form-control"
              disabled={loadingLocation}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger mt-2 form-control"
              required
              onClick={handleHide}
              disabled={loadingLocation}
            >
              Close
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showMap} onHide={handleHideMap} size="lg">
        <Modal.Body>
          <div style={{ height: "500px", width: "100%" }}>
            <MapContainer
              center={[listingState.location.lat, listingState.location.long]}
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
                position={[
                  listingState.location.lat,
                  listingState.location.long
                ]}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [30, 46],
                    iconAnchor: [12, 41]
                  })
                }
              >
                <Popup>Your picked location</Popup>
              </Marker>
            </MapContainer>
          </div>

          <button
            className="btn btn-danger form-control mt-4"
            onClick={handleHideMap}
          >
            Close map
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyListings;
