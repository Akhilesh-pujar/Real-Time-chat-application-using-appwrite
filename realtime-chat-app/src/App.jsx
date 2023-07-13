import './App.css'
import PrivateRoutes from './utils/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'


function App() {
  

  return (
    <Router>
    <AuthProvider>

   
     <Routes>
    
      <Route path='/login' element={ <LoginPage/>}/>

      <Route path='/' element={ <PrivateRoutes/>}>
      <Route path='/' element={ <Room/>}/>
      <Route path='/register' element={ <RegisterPage/>}/>
      </Route>


     </Routes>
     </AuthProvider>
   

    </Router>
  )
}

export default App
