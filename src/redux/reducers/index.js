export const initialState = {
  locationData: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DETAILS":
      return {
        ...state,
        locationData: [...state.locationData, action.payload],
      };

    default:
      return state;
  }
};

export default mainReducer;
