import {
  Popover,
  PopoverHandler,
  PopoverContent,
  IconButton,
   Avatar
  } from "@material-tailwind/react";
import { FetchProfileData } from "../Api/Api";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
    const {data} = FetchProfileData()
    
  return (
    <div className=" z-10">
       <Popover  className=" z-10">
          <PopoverHandler>
            <IconButton variant="text">
            <Avatar src="../../public/image/defaultpic.jpg" alt="avatar" size="xs" />
              
            </IconButton>
         
          </PopoverHandler>
          <PopoverContent className="z-10">
            <h1>Username: <span>{data?.username}</span></h1>
            <h1>Email: <span>{data?.email}</span></h1>
            <h1><UpdateProfile id={data?._id}/></h1>
          </PopoverContent>
    </Popover>
    </div>
  )
}

export default Profile
