/* eslint-disable react/prop-types */
import {  Tooltip, IconButton } from "@material-tailwind/react"
import { TrashIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteFileList } from "../Api/Api";
import {toast} from 'react-hot-toast'

const Delete = ({id}) => {
    const queryClient = useQueryClient()
    const deletefile = useMutation({
        mutationFn:DeleteFileList,
        onSuccess: () => {
            toast.success('Successfully Delete')
            queryClient.invalidateQueries({ queryKey: ['files'] })
        }
    })

   const handleDelete = () => {
      
        try {
            deletefile.mutate(id)
        } catch (error) {
            console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
   }

  return (
    <div>
      <Tooltip content="Delete User">
            <IconButton variant="text">
                <TrashIcon className="h-4 w-4" onClick={handleDelete}  />
            </IconButton>
        </Tooltip>
      
    </div>
  )
}

export default Delete
