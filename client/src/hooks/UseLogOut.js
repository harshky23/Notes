import { useContext } from "react"
import { Authcontext } from "../context/Authcontext"
import AppContext from "../context/Appcontext"

export const useLogout = () => {
    const { dispatch } = useContext(Authcontext)
    const { dispatch: dispatchWorkouts } = useContext(AppContext) //name for dispatch
  
    const logout = () => {
      // remove user from storage
      localStorage.removeItem('user')  // since signup wala ws store in local storage
  
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })
      dispatchWorkouts({ type: 'SET-NOTES', payload: null }) // when we log out we r clering 
    }
  
    return { logout }
  }