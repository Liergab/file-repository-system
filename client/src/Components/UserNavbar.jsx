import { useState } from "react"
import { Link } from "react-router-dom"
import {} from '@heroicons/react/24/solid'
import Profile from "./Profile"

const UserNavbar = () => {
    const[isOpen, setIsOpen] = useState(false)
  return (
    <nav className="md:flex bg-slate-100 py-6 items-center place-content-center justify-between border-b-2 border-blue-400">
    <div className="flex item-center justify-between">
      <Link to='/'>
        <h1 className="font-bold text-2xl">File-Repo</h1>
      </Link> 
      
      <div className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span><i className="fa-solid fa-xmark font-bold text-2xl"></i></span>:
         <span><i className="fa-solid fa-bars font-bold text-2xl"></i></span> 
         }
    </div>
    </div>
    
    <div className="hidden md:block z-10">
        <ul className="flex space-x-4 items-center place-content-center">
            
                <li className="font-medium hover:text-sky-600 z-10">
                  <span className="flex"><Profile /></span>
                </li>
         
           <Link to='/logout'>
                <li className=" hover:text-sky-600 font-medium">
                    Logout <span><i className="fa-solid fa-right-from-bracket"></i></span>
                </li>
            </Link>
           
        </ul>
    </div>

    {isOpen && 
     <div className="mt-4">
     <ul className="flex flex-col space-y-2 ">
         <Link to='/register'>
             <li className="font-medium hover:text-sky-600">
                 Settings <span><i className="fa-solid fa-user-tie"></i></span>
             </li>
         </Link>
        <Link to='/logout'>
             <li className=" hover:text-sky-600 font-medium">
                 Logout <span><i className="fa-solid fa-right-from-bracket"></i></span>
             </li>
         </Link>
        
     </ul>
 </div>
    }

   
   </nav>
  )
  
}

export default UserNavbar
