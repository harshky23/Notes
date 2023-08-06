
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogOut'
import {Authcontext} from '../context/Authcontext'
import { useContext } from 'react'



function Navbar() {
  const {user} = useContext(Authcontext)
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header className='navbar bg-body-tertiary customNav px-3'>
        <div>
            <Link to="/" className='link text-warning fs-2'>
                Notes
            </Link>
        </div>
        <nav>
          {user && (
          <div>
          <span className='me-3'>{user.email}</span>
          <button type="button" class="btn btn-outline-warning" onClick={handleClick}>LogOut</button>
          </div>)
        }
        {!user && (<div>
          <Link className='btn btn-warning me-4' to = "/login">Login</Link>
          <Link className='btn btn-warning' to = "/signup">SignUp</Link>
          </div>)}
        
        </nav>
    </header>
  )
}

export default Navbar