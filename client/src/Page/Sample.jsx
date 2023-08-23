/* eslint-disable react-hooks/exhaustive-deps */

import DataTable from 'react-data-table-component';
import { Fetchfile } from '../Api/Api';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import { DeleteFileList } from '../Api/Api';
import { toast } from 'react-hot-toast';
import { Tooltip,IconButton,Input} from '@material-tailwind/react';
import { TrashIcon } from "@heroicons/react/24/solid";
import Edit from '../Components/Edit';
import {  useState } from 'react';






function Sample() {
  const  {data,isLoading,isError} = Fetchfile()
  
    const [records, setRecords] = useState(null)
    
      if (data && records === null) {
        setRecords(data);
      }
    

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

    const handleChange = (e) => {
      const newdata = data.filter((row) => {
        return row.title.toLowerCase().includes(e.target.value.toLowerCase())
      })
      return setRecords(newdata)
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (isError) {
      return <p>Error: {isError.message}</p>;
    }
  
    // Once the data is fetched, store it in the state
  
   

   


    
    return (
      <div className='flex flex-col items-center place-content-center mt-10'>
        <div>
          
          <Input label='Search' onChange={handleChange}/>
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
            data={records}
            pagination 
            fixedHeader
        /> 
      </div>
       
    );
}


export default Sample