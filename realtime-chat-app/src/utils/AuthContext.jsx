import { createContext, useContext, useState, useEffect } from 'react'
import { account } from '../apwriteConfig'

const AuthContext = createContext()


export const AuthProvider = ({children})=>{

  const [user,setuser] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(false)
   },[])

    const handleUserLogin = async(e, cred)=>{
     e.preventDefault()

     try{
        const response =  await account.createEmailSession(cred.email,cred.password )
        console.log(response);
     }
     catch(error){
    console.log(error)
     }
    }

    const contextData = {
    user,
    handleUserLogin,
    }
return <AuthContext.Provider value={contextData}>
  {loading? <p>loading...</p>: children}
</AuthContext.Provider>
}

export const userAuth = ()=>{
    return useContext(AuthContext)
}
export default AuthContext