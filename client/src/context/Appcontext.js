import { useReducer , createContext } from "react";

const AppContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET-NOTES":
      return { notes: action.payload };  //action.payload haai sara data aana wala fetch se 
    case "CREATE":
      return { notes: [action.payload, ...state.notes] }; // state is old data on which new data(action.playload) is added
    case "DELETE_NOTES":
        return {
          notes: state.notes.filter((remove)=>{return remove._id !== action.payload._id})
      }  // will remove action.payload and return rest of satate
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: null,  // notes is initial state
  });

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
  {/* {...state, dispatch} , which means it contains all the properties of the state object (including the notes(initial) state) and also the dispatch function. if u write only state u should use state.notes to get the value */}
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
