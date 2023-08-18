/* eslint-disable react/no-unescaped-entities */
import Navbar from "../Components/Navbar"
import FormFormat from "../Components/FormFormat"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProfileData } from "../Api/Api"

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
      toast.success('Welcome');
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 ">
                <label className="font-semibold">Username</label>
                <input type="text"  placeholder="Enter username" {...register('username')} className="px-6   py-[6px] text-left border-2 border-slate-300 text-sm"/>  
                   {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>}
                <label className="font-semibold">Email</label>  
                <input type="text"  placeholder="your@gmail.com" {...register('email')} className="px-6 py-[6px]  text-left border-2 border-slate-300  text-sm"/>
                   {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>} 
                <label className="font-semibold">Password</label>
                <input type="password"  placeholder="Enter Password .."{...register('password')}  className="px-6  py-[6px] text-left border-2 border-slate-300  text-sm" />
                   {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>} 
                <label className="font-semibold">Confirm Password</label>
                <input type="password"  placeholder="Enter Confirm Password .."{...register('confirmPassword')}  className="px-6  py-[6px]  text-left border-2 border-slate-300  text-sm" />
                   {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>} 
                <button type="submit" style={{marginTop:'20px'}}  className="px-6 py-2  text-white bg-black rounded-md ">Register</button>

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
