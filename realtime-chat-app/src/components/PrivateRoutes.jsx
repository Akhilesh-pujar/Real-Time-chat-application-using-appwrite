import { Outlet,Navigate } from "react-router-dom"
import { userAuth } from "../utils/AuthContext"


function PrivateRoutes() {
    const {user} = userAuth()
   
  return (
    <div>
      {user ? <Outlet/> : <Navigate to='/login'/>}      
    </div>
  )
}

export default PrivateRoutes
