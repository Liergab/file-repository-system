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


// file api

export const CreateFiles = async(UserData) => {
    const response = await axios.post(`http://localhost:8000/api/file`, UserData,{
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(UserData)
    });
   
    return response.data
}

export const FetchFileListById = (id) => {
    const {data, isLoading, isError} = useQuery(['fileById', id], async() => {
        const response = await axios.get(`http://localhost:8000/api/file/${id}`);
        return response.data
        
    });

    return {data, isLoading, isError}
}

export const UpdatedFileList = async(UpdatedPost) => {
  
    const response = await axios.put(`http://localhost:8000/api/file/${UpdatedPost.id}`, UpdatedPost,{
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(UpdatedPost)
    });
    
    return response.data
};


export const DeleteFileList = async(id) => {
  
    const response = await axios.delete(`http://localhost:8000/api/file/${id}`,{
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(id)
    });
    return response.data
};



