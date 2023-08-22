import {Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Input,
    
} from '@material-tailwind/react'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import {CreateFiles} from '../Api/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const AddFiles = () => {

    const queryClient = useQueryClient()
    const createFiles = useMutation({
        mutationFn: CreateFiles,
            onSuccess: () => {
                setIsOpen(false)
                queryClient.invalidateQueries({ queryKey: ['files'] })
              },
      })

    const [open, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!open)
    }
      // form schema
    const schema = yup.object().shape({
        title:yup.string().required('Title is required!'),
        memo:yup.string().required('Memo is Required!')
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver:yupResolver(schema)
    })

    const onSubmit = async(data) => {
        try {
          const user = await createFiles.mutateAsync(data);
          toast.success('Succefully added');
         
          console.log(user);
        } catch (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
       
      }
    
  return (
    <>
    <div>
      <Button color='blue' onClick={handleOpen} >Add</Button>
    </div>
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add files</DialogHeader>
        <DialogBody divider>
            <Card color="transparent" shadow={false}>
                <form onSubmit={handleSubmit(onSubmit)} className=" mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                    <Input type='text' name='memo' size="lg" label="Memo" {...register('memo')} />
                    {errors.memo && <h1 className='text-sm text-red-600'>{errors.memo.message}</h1>}
                    <Input type='text' name='title' size="lg" label="Title" {...register('title')} />
                    {errors.title && <h1 className='text-sm text-red-600'>{errors.title.message}</h1>}
                    </div>
                    <Button type='submit' className="mt-6" fullWidth >
                     Add
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

export default AddFiles
