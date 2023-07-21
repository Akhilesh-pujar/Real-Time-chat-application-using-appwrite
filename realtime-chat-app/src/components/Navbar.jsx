
import {LogOut,LogIn} from "react-feather"
import { useAuth } from "../utils/AuthContext"
import { Link } from 'react-router-dom'
function Navbar() {

    const {user,userLogout} = useAuth()
  return (
    <div id="header--wrapper">
      {user ? (
        <>
        Welcome {user.name}
        <LogOut onClick={userLogout} className="header--link"/>

        </>
      ):(
        <Link to="/">
        <LogIn className="header--link"/>
    </Link>
      )}
    </div>
  )
}

export default Navbar
