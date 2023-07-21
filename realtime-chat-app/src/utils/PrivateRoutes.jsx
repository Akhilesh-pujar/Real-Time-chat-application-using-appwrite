
import { Outlet,Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"


function PrivateRoutes() {
    const {user} = useAuth()
   
  return (
    <div>
      {user ? <Outlet/> : <Navigate to='/login'/>}      
    </div>
  )
}

export default PrivateRoutes
