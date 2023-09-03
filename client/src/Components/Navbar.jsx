/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-tailwind/react"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'
    )
    const element = document.documentElement
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
    console.log(element)
    const option =[
        {
            icon:"sunny",
            text:"light"
        },
        {
            icon:"moon",
            text:"dark"
        },
        {
            icon:"desktop-outline",
            text:"system"
        }
    ]

    const onWindowMatch = () => {
        if(localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)){
            element.classList.add('dark')
        }else{
            element.classList.remove('dark')
        }
    }
    onWindowMatch()
    useEffect(() => {
        switch (theme) {
            case 'dark':
                element.classList.add('dark')
                localStorage.setItem('theme', 'dark')
                break;
            case 'light':
                element.classList.remove('dark')
                localStorage.setItem('theme', 'light')
                break;
            default:
                localStorage.removeItem('theme')
                break;
        }
    },[theme])

    darkQuery.addEventListener('change', (e) => {
        if(!('theme' in localStorage)){
            if(e.matches){
                element.classList.add('dark')
            }else{
                element.classList.remove('dark')
            }
        }
    })
   
  return (
   <nav className="md:flex bg-slate-100 py-6 items-center place-content-center justify-between border-b-2
    border-blue-400 dark:text-gray-100 dark:bg-blue-gray-900 duration-100 ">
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
        <ul className="flex space-x-4 items-center">
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
          <li>
            <li>
            {option.map((opt) => (
            <Button key={opt.text}
             variant="text"
             size="md"
             className={` w-auto text-md ${theme === opt.text && ' text-blue-800'}`} onClick={() => setTheme(opt.text)}>
                <ion-icon name={opt.icon}></ion-icon>
            </Button>
        ))}
            </li>
          </li>
           
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
