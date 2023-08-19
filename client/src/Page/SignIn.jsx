/* eslint-disable react/no-unescaped-entities */
import FormFormat from "../Components/FormFormat"
import Navbar from "../Components/Navbar"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link } from "react-router-dom"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import {  LoginUser } from "../Api/Api"
import { toast } from "react-hot-toast"
import { Input,Button } from "@material-tailwind/react";
// import axios from 'axios'






const Login = () => {
    const queryClient = useQueryClient()
  
    const navigate = useNavigate()
    

    const schema = yup.object().shape({
        email: yup.string().email().required('Email is required!'),
        password: yup.string().required('Password is requires!').min(4).max(12)
    })

   
    const { register, handleSubmit,  formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    });

      // const loginMutation = useMutation(async (formData) => {
      //   const response = await axios.post('http://localhost:8000/api/login', formData);
      //   const token = response.data.generateToken;
      //   localStorage.setItem('token', token)
      // });

      const loginUser = useMutation({
        mutationFn:LoginUser,
        onSuccess: () => {
          toast.success('You are log in, welcome');
          navigate('/dashboard')
          queryClient.invalidateQueries({ queryKey: ['userProfile'] })
        },
      })

      const onSubmit = async(data) => {
        try {
          const user = await loginUser.mutateAsync(data);
         if(!user){
          console.log(user);
         }
        } catch (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
       

      }
       
      
  return (
    <>
        <Navbar />
        <div className="h-[calc(100vh-80px)]">
        
        <FormFormat>
            <div className="flex flex-col space-y-4">
            <span className="text-2xl font-bold text-center"> Sign in</span>
            <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 ">
             
                <Input type="text"  label="your@email.com" icon={<i className="fa-regular fa-rectangle-list"/>}
                 {...register('email')}  className="px-6 py-2 text-left border-2 border-slate-300"/>
                {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}

                <Input type="password"  label="Enter Password .." icon={<i className="fa-regular fa-rectangle-list"/>}
                  {...register('password')}  autoComplete="true" className="px-6 py-2 text-left border-2 border-slate-300" />
                {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
                
                <Button type="submit"  className="px-6 py-2 text-white bg-black rounded-md">Sign in</Button>
            </form>
            <div className=" flex flex-col items-center ">
                <span>or</span>
                <div className="flex space-x-4 items-center">
                <span className="text-sm ">Doesn't  have an account?</span>
                <Link to='/register'><span className="text-sm font-semibold ">Sign up</span></Link>
                </div>
               
            </div>
            </div>

          
            
        </FormFormat>
        </div>
    </>
   
  )
}

export default Login
