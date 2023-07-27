const reducer = (state, action) => {
  switch (action.type) {
    case "GENRES_DETAILS":
      return {
        ...state,
        isLoading: false,
        with_genres: action.payload.with_genres,
        results: action.payload.results,
      };
  }
  return state;
};
export default reducer;
