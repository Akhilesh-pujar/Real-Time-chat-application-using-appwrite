/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react'
import  { account } from '../apwriteConfig'
import { useNavigate } from 'react-router'
import { ID } from 'appwrite'


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [user,setuser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    getUserOnLoad()
   },[])

   const getUserOnLoad = async()=>{
    try{
     let accountDetails = await account.get();
     console.log(accountDetails)
      setuser(accountDetails)
    }
    catch(error){
      console.log(error)
      setuser(null)
    }
    setLoading(false);
   }

    const handleUserLogin = async (e, cred) =>{
     e.preventDefault()
     console.log('CREDS:', cred)

     try{
        let response =  await account.createEmailSession(cred.email , cred.password )
        let accountDetails = await account.get();
        setuser(accountDetails)
        console.log(response);

        navigate('/')
     }
     catch(error){
    console.log(error)
     }
    }

    const userLogout = async ()=>{
     const response = await account.deleteSession('current');
     setuser(null)
    }

    const handleRegister = async (e, cred) => {
      e.preventDefault()
      console.log('Handle Register triggered!', cred)

      if(cred.password1 !== cred.password2){
          alert('Passwords did not match!')
          return 
      }

      try{
          
          let response = await account.create(ID.unique(), cred.email, cred.password1, cred.name);
          console.log('User registered!', response)

          await account.createEmailSession(cred.email, cred.password1)
          let accountDetails = await account.get();
          setuser(accountDetails)
          navigate('/')
      }catch(error){
          console.error(error)
      }
  }

    const contextData = {
    user,
    handleUserLogin,
    userLogout,
    handleRegister,

    }
return (
<AuthContext.Provider value={contextData}>
  {loading? <p>loading...</p>: children}
</AuthContext.Provider>
);


}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=> {
  return useContext(AuthContext);
}

export default AuthContext;