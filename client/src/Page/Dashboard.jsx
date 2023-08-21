
import { FetchProfileData } from "../Api/Api"

import { Fetchfile } from "../Api/Api"
import { Spinner,Card, Typography  } from "@material-tailwind/react";
import UserNavbar from "../Components/UserNavbar";
import AddFiles from "../Components/AddFiles";
import Edit from "../Components/Edit";
import Delete from "../Components/Delete";


const Dashboard = () => {
  
  const {data: user, isError} = FetchProfileData()
  const {data: files , isLoading} = Fetchfile()
 

  

  if(isError) {
    <h1>Error</h1>
  }

  if(isLoading) return <div><Spinner /></div>
 
  return (
    <div>
      <UserNavbar/>
        <div className="h-[calc(100vh-80px)] flex flex-col flex-wrap space-y-10 text-center  px-0  md:px-28 overflow-auto ">
          <div>
            <h1 className="font-semibold text-md text-left mt-5"> WELCOME, {user?.username.toUpperCase()} ! </h1> 
          </div>
          <div className="text-left">
            <AddFiles />
          </div>
          <div>
              <Card className="h-full w-full ">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                     
                        <th
                         
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-sm md:text-normal"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70 text-sm md:text-normal"
                          >
                            Memo
                          </Typography>
                        </th>
                        
                        <th
                         
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            Title
                          </Typography>
                        </th>
                        
                        <th
                         
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70 text-sm md:text-normal"
                          >
                            Date
                          </Typography>
                        </th>
                        
                        <th
                         
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-sm md:text-normal"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70 text-sm md:text-normal"
                          >
                            Action
                          </Typography>
                        </th>
                        <th
                         
                         className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                       >
                         <Typography
                           variant="small"
                           color="blue-gray"
                           className="font-normal leading-none opacity-70"
                         >
                           
                         </Typography>
                       </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {files.length == 0 ? <h1 className="mt-5 mb-5">No File Found... </h1> : <>
                    {files.map((file, index) => {
                      const isLast = index === file.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          
                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {file.memo}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {file.title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {file.createdAt}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Edit id={file._id} />
                             
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Delete id={file._id} />
                             
                            </Typography>
                          </td>
                        </tr>
                        
                      );
                    })}</>}
                  </tbody>
                </table>
            </Card>
          </div>
          </div>
    </div>
  )
}

export default Dashboard
