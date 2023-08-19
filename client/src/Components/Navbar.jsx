import { useState } from "react"
import { Link } from "react-router-dom"
const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false)
  return (
   <nav className="md:flex bg-slate-100 py-6 items-center place-content-center justify-between border-b-2 border-blue-400">
    <div className="flex item-center justify-between">
      <Link to='/'>
        <h1 className="font-bold text-2xl">File-Repo</h1>
      </Link> 
      {/* <Link to='/sample'>
        <h1 className="font-bold text-2xl">Protected</h1>
      </Link> */}
      <div className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span><i className="fa-solid fa-xmark font-bold text-2xl"></i></span>:
         <span><i className="fa-solid fa-bars font-bold text-2xl"></i></span> 
         }
    </div>
    </div>
    
    <div className="hidden md:block">
        <ul className="flex space-x-4">
            <Link to='/register'>
                <li className="font-medium hover:text-sky-600">
                    Register <span><i className="fa-solid fa-right-to-bracket"></i></span>
                </li>
            </Link>
           <Link to='/login'>
                <li className=" hover:text-sky-600 font-medium">
                    Login <span><i className="fa-solid fa-user"></i></span>
                </li>
            </Link>
           
        </ul>
    </div>

    {isOpen && 
     <div className="mt-4">
     <ul className="flex flex-col space-y-2 ">
         <Link to='/register'>
             <li className="font-medium hover:text-sky-600">
                 Register <span><i className="fa-solid fa-right-to-bracket"></i></span>
             </li>
         </Link>
        <Link to='/login'>
             <li className=" hover:text-sky-600 font-medium">
                 Login <span><i className="fa-solid fa-user"></i></span>
             </li>
         </Link>
        
     </ul>
 </div>
    }

   
   </nav>
  )
}

export default Navbar
