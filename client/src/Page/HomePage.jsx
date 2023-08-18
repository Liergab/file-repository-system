/* eslint-disable react/no-unescaped-entities */
import Navbar from "../Components/Navbar"


const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className="h-[calc(100vh-80px)]  flex items-center place-content-center">
        <div className="flex flex-col items-center place-content-center  w-4/5 h-3/6 md:space-y-0 space-y-8 bg-slate-300 rounded-xl shadow-2xl p-8">
            <h1 className="font-semibold md:text-xl text-base text-center sm:text-sm ">This is The Homepage of File Repository!</h1>
            <span className="font-semibold md:text-xl max-w-l text-base text-center sm:text-sm  "> A File Repository System stores an Individual's Files or Data to be secured and organized</span>
        </div>
    </div>
    </>
  )
}

export default HomePage
