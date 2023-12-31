import {Routes, Route} from 'react-router-dom'
import HomePage from './Page/HomePage'
import Register from './Page/Register'
import SignIn from './Page/SignIn'
import Dashboard from './Page/Dashboard'
import './App.css'
import {Toaster} from 'react-hot-toast'
import PrivateRoutes from './util/PrivateRoutes'
import Sample from './Page/Sample'
import Logout from './Components/Logout'

const App = () => {
  return (
   
    <div className='App dark:text-gray-100 dark:bg-blue-gray-900 duration-100 '>
       <Toaster position='top-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<SignIn/>}/>
        
        <Route element={<PrivateRoutes/>}>
          <Route path='/dashboard' element={<Dashboard/>} exact/>
          <Route path='/sample' element={<Sample/>} exact/>
          <Route path='/logout' element={<Logout />} />

        </Route>
      
      </Routes>
    </div>
   
  )
}

export default App
