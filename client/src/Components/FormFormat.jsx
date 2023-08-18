/* eslint-disable react/prop-types */


const FormFormat = ({children}) => {
  return (
    <div className=" h-[calc(100vh-80px)] flex items-center place-content-center ">
     <div className="h-auto md:w-3/12 w-4/5 bg-white rounded-md bg-clip-padding backdrop-filter 
                            backdrop-blur-lg bg-opacity-50 border border-gray-100 shadow-md px-6 py-4">
        {children}
     </div>
     
    </div>
  )
}

export default FormFormat
