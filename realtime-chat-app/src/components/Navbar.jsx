
import {LogOut,LogIn} from "react-feather"
import { userAuth } from "../utils/AuthContext"
import { Link } from 'react-router-dom'
function Navbar() {

    const {user,userLoggout} = userAuth()
  return (
    <div id="header--wrapper">
      {user ? (
        <>
        Welcome {user.name}
        <LogOut onClick={userLoggout} className="header--link"/>

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
