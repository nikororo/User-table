const initialState = {
  list: [
    {
      lastName: "Печуркина",
      firstName: "Екатерина",
      email: "nikoro@gmail.com",
    },
    {
      lastName: "Петрова",
      firstName: "Елена",
      email: "niko@gmail.com",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PERSON":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "DELETE_PERSON":
      const newList = state.list.filter((item) => item !== action.payload);
      return {
        ...state,
        list: newList,
      };
    case "EDIT_PERSON":
      const editedList = state.list.map((pers) => {
        if (pers === action.payload.oldPerson) {
          return action.payload.newPerson;
        }
        return pers;
      });
      return {
        ...state,
        list: editedList,
      };
    default:
      return state;
  }
};

export default reducer;
