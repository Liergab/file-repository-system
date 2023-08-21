/* eslint-disable react/no-unescaped-entities */
import Navbar from "../Components/Navbar"
import FormFormat from "../Components/FormFormat"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProfileData } from "../Api/Api"
import { Input,Button } from "@material-tailwind/react";
import {  toast } from "react-hot-toast"
// import axios from "axios"


const Register = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const createProfileData = useMutation({
    mutationFn: CreateProfileData,
        onSuccess: () => {
            navigate('/login')
            queryClient.invalidateQueries({ queryKey: ['userProfile'] })
          },
  })

  // const navigate = useNavigate()

  const schema = yup.object().shape({
    username:yup.string().required('Username Required!'),
    email: yup.string().email().required('Email required!'),
    password:yup.string().required('Password Required').min(4).max(12),
    confirmPassword : yup.string()
    .oneOf([yup.ref("password"), null ] ,'Password does not match')
    .required('Incorrect password')
    })

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema )
  });
  const onSubmit = async(data) => {
    try {
      const user = await createProfileData.mutateAsync(data);
      toast.success('You may now Login');
      navigate('/login');
      console.log(user);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
   
  }
  return (
    <>
     <Navbar/>
     <div className="h-[calc(100vh-80px)]">
     <FormFormat>
            <div className="flex flex-col space-y-2">
            <span className="text-2xl font-bold text-center"> Register</span>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 ">
                <Input type="text"  label="Username"  icon={<i className="fa-regular fa-rectangle-list"/>} {...register('username')} className="px-6   py-[6px] text-left border-2 border-slate-300 text-sm"/>  
                   {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>}
                <Input type="text"  label="Your@Email.com" icon={<i className="fa-regular fa-rectangle-list"/>} {...register('email')} className="px-6 py-[6px]  text-left border-2 border-slate-300  text-sm"/>
                   {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>} 
                <Input type="password"  label="Password"{...register('password')} icon={<i className="fa-regular fa-rectangle-list"/>}  className="px-6  py-[6px] text-left border-2 border-slate-300  text-sm" />
                   {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>} 
                <Input type="password"  label="Confirm Password .."{...register('confirmPassword')} icon={<i className="fa-regular fa-rectangle-list"/>}  className="px-6  py-[6px]  text-left border-2 border-slate-300  text-sm" />
                   {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>} 
                <Button type="submit" style={{marginTop:'20px'}}  className="px-6 py-2  text-white bg-black rounded-md ">Register</Button>

            </form>
            <div className=" flex flex-col items-center ">
                <span>or</span>
                <div className="flex space-x-4 items-center">
                <span className="text-sm ">Have an account?</span>
                <Link to='/Login'><span className="text-sm font-semibold ">Sign in</span></Link>
                </div>
               
            </div>
            </div>
            
        </FormFormat>
    </div> 
    </>
   
  )
}

export default Register
