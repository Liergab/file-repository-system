
import { FetchProfileData } from "../Api/Api"
import Navbar from "../Components/Navbar"



const Dashboard = () => {
  
  const {data, isError} = FetchProfileData()

  if(isError) {
    <h1>Error</h1>
  }
 
  return (
    <div>
        <Navbar/>
        {data?.username}
        {data?.email}
        <h1>hello</h1>
        
        
    
    </div>
  )
}

export default Dashboard
