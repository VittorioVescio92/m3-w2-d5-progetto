const initialState = {
  location: { selectedLocation: {} },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DETAILS":
      return {
        ...state,
        location: {
          selectedLocation: action.payload,
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
