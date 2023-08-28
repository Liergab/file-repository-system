/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Card,
    Input,
    
} from '@material-tailwind/react'
import { useState } from 'react';
import { FetchProfileDataById, UpdatedUserProfile } from '../Api/Api';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const UpdateProfile = ({id}) => {
    const [open, setOpen] = useState(false);
    const {data:profileId} = FetchProfileDataById(id)
    const updateProfile = useMutation({
        mutationFn:UpdatedUserProfile,
        onSuccess: () => {
            setOpen(false)
        }
    })

    
 
     const handleOpen = () => setOpen(!open);

     const schema = yup.object().shape({
        username: yup.string(),
        email: yup.string().email(),
        password:yup.string().min(4).max(12),
        confirmPassword : yup.string()
        .oneOf([yup.ref("password"), null ] ,'Password does not match')
        
     })

     const{control, handleSubmit , formState:{errors}} = useForm({
        resolver:yupResolver(schema)
     })

     const onSubmit = async(data) => {
        console.log(data)
        try {
          const user = await updateProfile.mutateAsync({id, ...data});
          toast.success('Succefully Updated');
         
          console.log(user);
        } catch (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
       
     }


  return (
    <>
      
      <Button variant="text" onClick={handleOpen}>Update Profile</Button>
      <Dialog
        open={open}
        handler={handleOpen}
      >
        <DialogHeader>Update Profile</DialogHeader>
            <DialogBody divider>
                <Card color="transparent" shadow={false}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                        <Controller 
                            name='username'
                            control={control}
                            defaultValue={profileId?.username}
                            render={({field}) => (
                                <Input type='text' 
                                size="lg" 
                                label="Username" 
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                 />
                            )}
                        />
                         {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>} 
                         <Controller 
                            name='email'
                            control={control}
                            defaultValue={profileId?.email}
                            render={({field}) => (
                                <Input type='text' 
                                size="lg" 
                                label="Email" 
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                 />
                            )}
                        />
                         {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>} 
                         <Controller 
                            name='password'
                            control={control}
                            defaultValue={profileId?.password}
                            render={({field}) => (
                                <Input type='password' 
                                size="lg" 
                                label="Password" 
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                 />
                            )}
                        />
                         {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>} 

                        <Controller 
                            name='confirmPassword'
                            control={control}
                            defaultValue='confirm password'
                            render={({field}) => (
                                <Input type='text' 
                                size="lg" 
                                label="Confirm Password" 
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                 />
                            )}
                        />
                         {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>} 
                       
                        </div>
                        
                        <Button type='submit' className="mt-6" fullWidth>
                        Update
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

export default UpdateProfile
