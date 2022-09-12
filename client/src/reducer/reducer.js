export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    case "update-rating":
      return { ...state, rating: action.payload };

    case "update-description":
      return { ...state, description: action.payload };

    case "update-listing-name":
      return { ...state, name: action.payload };

    case "update-listing-image":
      return { ...state, image: action.payload };

    case "update-listing-description":
      return { ...state, description: action.payload };

    case "update-listing-location":
      return {
        ...state,
        location: { ...state.location, place: action.payload }
      };

    case "update-location-latitude":
      return { ...state, location: { ...state.location, lat: action.payload } };

    case "update-location-longitude":
      return {
        ...state,
        location: { ...state.location, long: action.payload }
      };

    case "reset-to-initial":
      return { ...action.payload };

    default:
      return state;
  }
};
