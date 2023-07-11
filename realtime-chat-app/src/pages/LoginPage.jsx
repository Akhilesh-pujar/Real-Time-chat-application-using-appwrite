import { useEffect,useState} from "react"
import { userAuth } from "../utils/AuthContext"
import { useNavigate } from "react-router-dom"

function LoginPage() {

    const {user,handleUserLogin} = userAuth()
    const navigate = useNavigate()

    const [cred , setcred] = useState({
        email:"",
        password:''
    })

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


    const handleLogin =()=>{

    }
  return (
    <div>
      <div className="auth--container">
              <div className="form--wrapper">
                <form onSubmit={(e)=>{handleLogin(e.cred)}}>
                    <div className="field--wrapper">
                     <label>Email</label>
                     <input type ="email"
                     required
                     name="email"
                     placeholder="enter your email..."
                     value={cred.email}
                     onChange={handleinputChange}
                     ></input>
                    </div>

                    <div className="field--wrapper">
                     <label>Password</label>
                     <input type ="password"
                     required
                     name="password"
                     placeholder="enter your password..."
                     value={cred.password}
                     onChange={handleinputChange}
                     autoComplete="on"
                     ></input>
                    </div>

                    <div className="field--wrapper">
                       <button className="btn btn--lg btn--main" value="Login" type="submit">Login</button>
                    </div>
                </form>

              </div>
      </div>
    </div>
  )
}

export default LoginPage
