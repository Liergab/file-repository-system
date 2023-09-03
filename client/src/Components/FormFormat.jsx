/* eslint-disable react/prop-types */


const FormFormat = ({children}) => {
  return (
    <div className=" h-[calc(100vh-80px)] flex items-center place-content-center dark:text-gray-100 dark:bg-blue-gray-900 duration-100  ">
     <div className="h-auto md:w-3/12 w-4/5  dark:bg-white  rounded-md 
                            border border-gray-100 shadow-md px-6 py-4">
        {children}
     </div>
     
    </div>
  )
}

export default FormFormat
