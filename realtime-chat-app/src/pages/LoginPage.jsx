import { useEffect,useState} from "react"
import { userAuth } from "../utils/AuthContext"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'

function LoginPage() {

    const {user,handleUserLogin} = userAuth()

    const [cred , setcred] = useState({
      email:"",
      password:""
  })

    
    const navigate = useNavigate()

   
    useEffect(()=>{
     if(user){
        navigate('/')
     }
    },[])

    const handleinputChange=(e)=>{
   let name = e.target.name
   let value =e.target.value

   setcred({...cred, [name]:value})


    }


  
  return (
    <div>
      <div className="auth--container">
              <div className="form--wrapper">
                <form onSubmit={(e)=>{handleUserLogin(e,cred)}}>
                    <div className="field--wrapper">
                     <label>Email</label>
                     <input type ="email"
                     required
                     name="email"
                     placeholder="enter your email..."
                     value={cred.email}
                     onChange={(e)=>{handleinputChange(e)}}
                     ></input>
                    </div>

                    <div className="field--wrapper">
                     <label>Password</label>
                     <input type ="password"
                     required
                     name="password"
                     placeholder="enter your password..."
                     value={cred.password}
                     onChange = {(e)=>{handleinputChange(e)}}
                     autoComplete="on"
                     ></input>
                    </div>

                    <div className="field--wrapper">
                       <button className="btn btn--lg btn--main" value="Login" type="submit">Login</button>
                    </div>
                </form>
                <p>Dont have an account? Register <Link to="/register">here</Link></p>
              </div>
      </div>
    </div>
  )
}

export default LoginPage
