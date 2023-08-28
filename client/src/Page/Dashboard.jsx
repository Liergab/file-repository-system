
import { FetchProfileData } from "../Api/Api"

import { Fetchfile } from "../Api/Api"
import { Spinner} from "@material-tailwind/react";
import UserNavbar from "../Components/UserNavbar";
import AddFiles from "../Components/AddFiles";
import Edit from "../Components/Edit";

import DataTable from 'react-data-table-component';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import { DeleteFileList } from '../Api/Api';
import { toast } from 'react-hot-toast';
import { Tooltip,IconButton} from '@material-tailwind/react';
import { SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";


// import Delete from "../Components/Delete";


const Dashboard = () => {
  
  const {data: user} = FetchProfileData()
  const  {data,isLoading,} = Fetchfile()
  
  // const [records, setRecords] = useState(null)
  
  //   if (data && records === null) {
  //     setRecords(data);
  //   }
  

const queryClient = useQueryClient()
  const deletefile = useMutation({
      mutationFn:DeleteFileList,
      onSuccess: () => {
          toast.success('Successfully Delete')
          queryClient.invalidateQueries({ queryKey: ['files'] })
      }
  })
  const handleDelete = (id) => {
    deletefile.mutate(id)
  }


  // if(isLoading) return <div><Spinner /></div>
 
  return (
    <div>
      <UserNavbar/>
        <div className="h-[calc(100vh-80px)] flex flex-col space-y-2 text-center  px-0  md:px-28 overflow-x: auto z-0 ">
          <div className="flex justify-between items-center place-content-center">
            <div> <AddFiles/></div>
            <h1 className="font-semibold text-md text-left mt-5"> WELCOME, {user?.username.toUpperCase()} ! </h1> 
            
          </div>
          <div className="h-40">
            {isLoading ? <span className="flex items-center place-content-center" ><Spinner /></span> : 
          <DataTable
            columns={[
              {
                  name: 'Title',
                  selector: row => row.title,
                  sortable:true
                  
              },
              {
                  name: 'Memo',
                  selector: row => row.memo,
                  sortable:true,
                  style: {
                    backgroundColor: 'gray',
                    color: 'white',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  },
                  
              },{
                name: 'Date',
                selector: row => row.createdAt,
                sortable:true
                
          
              },{
                name:'Action',
                cell: row => (

                  <div className='flex'>
                  <Tooltip content="Delete User">
                    <IconButton variant="text">
                        <TrashIcon className="h-4 w-4" onClick={() => handleDelete(row._id)}  />
                    </IconButton>
                  </Tooltip>
                  <div>
                    <Edit id={row._id} />
                  </div>
                  </div> 
                )
                
              }
          ]}
            data={data}
            pagination 
            fixedHeader
        /> }
          </div>
          </div>
    </div>
  )
}

export default Dashboard
