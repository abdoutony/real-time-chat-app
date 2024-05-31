import axios from "axios";
import axiosInstance from "../lib/axios";
export const handleLogin = ({ email, password }:{email:string,password:string}) => {
  axiosInstance
    .post("/auth/login", { email, password })
    .then((res) => {
        console.log(res)
      if (res.status === 200) {
          window.location = "/chat" as unknown as Location;
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.msg);
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