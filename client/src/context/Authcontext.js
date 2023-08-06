import { createContext , useReducer, useEffect} from 'react'

export const Authcontext = createContext(); // craeting context

export const authReducer = (state , action)=>{
 switch(action.type){
    case 'LOGIN':
        return {user: action.payload}
    case 'LOGOUT':
        return {user: null}
    default :
        return  state
 }
}

export const AuthProvider = ({children}) =>{
    const [state , dispatch] = useReducer(authReducer , {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {   // if user is valid then only load posts
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])  // to make sure if page refresh we get vaule of user from local storage which does not change once stored

    console.log("state is ", state);
    return (
        <Authcontext.Provider value={{ ...state, dispatch }}>
      {/* {...state, dispatch} , which means it contains all the properties of the state object (including the user(initial) state) and also the dispatch function. if u write only state u should use state.notes to get the value */}
          {children}
        </Authcontext.Provider>
      );
}

