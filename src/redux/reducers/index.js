const initialState = {};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return {
        // ...state,
        // favourites: {
        //   ...state.favourites,
        //   content: [...state.favourites.content, action.payload],
        // },
      };

    default:
      return state;
  }
};

export default mainReducer;
