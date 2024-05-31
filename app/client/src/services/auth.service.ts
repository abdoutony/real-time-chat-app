import axios from "axios";
import axiosInstance from "../lib/axios";
import { SetStateAction } from "react";
export const handleLogin = ({ email, password }:{email:string,password:string},setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }
) => {
    setLoading(true)
  axiosInstance
    .post("/auth/login", { email, password })
    .then((res) => {
        console.log(res)
      if (res.status === 200) {
        setLoading(false)
          window.location = "/chat" as unknown as Location;
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false)
      setTimeout(()=>{
        alert(err.response.data.msg);
      },1000)
    });
};
export const handleLogout = async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      console.log(res.data)
      window.location = "/" as unknown as Location
    } catch (err:any) {  
       alert(err.response.data.message );
    }
  };