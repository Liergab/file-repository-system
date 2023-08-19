
import { FetchProfileData } from "../Api/Api"
import Navbar from "../Components/Navbar"
import { Fetchfile } from "../Api/Api"
import { Spinner } from "@material-tailwind/react";



const Dashboard = () => {
  
  const {data: user, isError} = FetchProfileData()
  const {data: files , isLoading} = Fetchfile()

  

  if(isError) {
    <h1>Error</h1>
  }

  if(isLoading) return <div><Spinner /></div>
 
  return (
    <div>
        <Navbar/>
        <div className="h-[calc(100vh-80px)]">
          <div>
            {user?.username}  
            
            
          </div>
          <div>
          <table className="table-auto space-x-10 text-center">
                    <thead>
                      <tr className="space-x-10">
                        <th>Memo</th>
                        <th>Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
              {files.map((file) => {
                return(
                <div key={file._id}>
                   <td>{file.memo}</td>
                    <td>{file.title}</td>
                </div>
                       
                    
                )
              })}
                </tr>
                    </tbody>
                  </table>
          </div>
     
        </div>
    </div>
  )
}

export default Dashboard
