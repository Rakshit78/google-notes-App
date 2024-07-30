const initialState = [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter((note) => note.id !== action.payload);
    case 'PIN_NOTE':
      return state.map((note) =>
        note.id === action.payload ? { ...note, pinned: !note.pinned } : note
      );
    default:
      return state;
  }
};

export default notesReducer;
