
import DataTable from 'react-data-table-component';
import { Fetchfile } from '../Api/Api';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import { DeleteFileList } from '../Api/Api';
import { toast } from 'react-hot-toast';
import { Tooltip,IconButton } from '@material-tailwind/react';
import { TrashIcon } from "@heroicons/react/24/solid";
import Edit from '../Components/Edit';





function Sample() {
  const  {data,isLoading} = Fetchfile()
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

    if(isLoading) return <h1>Loading .....</h1>
    return (
      <div className='flex flex-col items-center place-content-center mt-10'>
        <div>
        
        </div>
         <DataTable
            columns={[
              {
                  name: 'Title',
                  selector: row => row.title,
                  
              },
              {
                  name: 'Memo',
                  selector: row => row.memo,
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
        /> 
      </div>
       
    );
}


export default Sample