import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  

export const FetchProfileData = () => {
    const {data, isLoading, isError} = useQuery(['userProfile'], async() => {
        const response = await axios.get("http://localhost:8000/api/protected");
      
        return response.data
        
    });

    return {data, isLoading, isError}
}

export const Fetchfile = () => {
    const {data, isLoading, isError} = useQuery(['files'], async() => {
        const response = await axios.get("http://localhost:8000/api/file");
        return response.data
        
    });

    return {data, isLoading, isError}
}

export const CreateProfileData = async(UserData) => {
    const response = await axios.post(`http://localhost:8000/api/register`, UserData,{
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(UserData)
    });
   
    return response.data
}




export const LoginUser = async (formData) => {
    const response = await axios.post('http://localhost:8000/api/login', formData);
    const token = response.data.generateToken;
    localStorage.setItem('token', token)
  }


