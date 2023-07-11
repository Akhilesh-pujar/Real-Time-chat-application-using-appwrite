import './App.css'
import PrivateRoutes from './components/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'


function App() {
  

  return (
    <Router>
    <AuthProvider>

   
     <Routes>
    
      <Route path='/login' element={ <LoginPage/>}/>

      <Route path='/' element={ <PrivateRoutes/>}>
      <Route path='/' element={ <Room/>}/>
      </Route>


     </Routes>
     </AuthProvider>
   

    </Router>
  )
}

export default App
