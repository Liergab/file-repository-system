/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Input,
    IconButton,
    Tooltip
    
} from '@material-tailwind/react'
import { PencilIcon } from "@heroicons/react/24/solid";
import { FetchFileListById, UpdatedFileList } from "../Api/Api"
import {Controller, useForm} from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'


const Edit = ({id}) => {
    const queryClient = useQueryClient()
    
    const [open, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!open)
    }
    const {data:FilebyId} = FetchFileListById(id);
   
    const updateFile = useMutation({
        mutationFn:UpdatedFileList,
        onSuccess: () => {
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ['files'] })
        }
    })

    const schema = yup.object().shape({
        title:yup.string().required('Title is required!'),
        memo:yup.string().required('Memo is Required!')
    })
    
    

    const {control,  handleSubmit,   formState:{errors}} = useForm({
        resolver:yupResolver(schema)
    })


    const onSubmit = async(data) => {
        console.log(data)
        try {
          const user = await updateFile.mutateAsync({id, ...data});
          toast.success('Succefully Updated');
         
          console.log(user);
        } catch (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
       
      }
      
  return (
    <>
   
        <Tooltip content="Edit User">
            <IconButton variant="text">
                <PencilIcon className="h-4 w-4" onClick={handleOpen} />
            </IconButton>
        </Tooltip>
   
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit files</DialogHeader>
        <DialogBody divider>
            <Card color="transparent" shadow={false}>
                <form onSubmit={handleSubmit(onSubmit)} className=" mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  
                    <div className="mb-4 flex flex-col gap-6">
                      <Controller 
                      name="memo"
                      control={control}
                      defaultValue={FilebyId?.memo}
                      render={({ field , onBlur}) => (
                        <Input
                          type="text"
                          label='Memo'
                          size="lg" 
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}

                    />
                      {errors.memo && <h1 className='text-sm text-red-600'>{errors.memo.message}</h1>}
                      <Controller
                      name='title'
                      control={control}
                      defaultValue={FilebyId?.title}
                      render={({field}) => (
                        <Input
                        type='text'
                        label='Title'
                        size='lg'
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                      />
                      {errors.title && <h1 className='text-sm text-red-600'>{errors.title.message}</h1>}
                    </div>
                    <Button type='submit' className="mt-6" fullWidth >
                     Edit
                    </Button>
                </form>
            </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Edit
