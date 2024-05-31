import React, { useState, useEffect } from "react";
import { handleLogin } from "../services/auth.service";

import { loginSchema } from "../lib/validation";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function Home() {
  const [loading,setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    const{email,password} = data 
    handleLogin({email,password},setLoading)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    // <p>
    //   It's <time dateTime={response}>{response}</time>
    // </p>
   <div className="bg-gray-100 h-screen flex items-center justify-center">
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
      <input type="email" {...register('email')} placeholder="enter email"
       id="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
      {errors.email && <span className="text-red-500"><>{errors.email.message}</></span>}
    </div>
    <div className="mb-6">
      <label htmlFor="password"
       className="block text-gray-700 mb-2">Password</label>
      <input type="password" {...register('password')} placeholder="enter password"
       id="password" 
       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
     {errors.password && <span className="text-red-500"><>{errors.password.message}</></span>}
    </div>
    <button  
    
    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
      {loading ? "Loading ..." :"Login"}
    </button>
  </form>
  <div className="mt-6 flex items-center justify-center">
    <div className="border-t w-full border-gray-300" />
    <span className="mx-2 text-gray-500">OR</span>
    <div className="border-t w-full border-gray-300" />
  </div>
  <div className="mt-6">
<button

className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-50">
  <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 9.5c3.08 0 5.72 1.18 7.77 3.11l5.78-5.78C33.93 4.43 29.3 2.5 24 2.5 14.88 2.5 7.26 8.62 4.55 16.8l6.91 5.43C13.05 14.4 18.12 9.5 24 9.5z" fill="#EA4335" /><path d="M46.5 24c0-1.72-.15-3.37-.43-5H24v9.5h12.65c-.55 2.92-2.18 5.34-4.68 6.95l7.25 5.71C43.14 37.25 46.5 31.14 46.5 24z" fill="#4285F4" /><path d="M10.45 30.23A15.04 15.04 0 0 1 8 24c0-2.06.39-4.04 1.08-5.87l-6.91-5.43C.77 16.78 0 20.28 0 24s.77 7.22 2.17 10.3l8.28-6.35z" fill="#FBBC05" /><path d="M24 46.5c5.3 0 9.93-1.83 13.63-4.94l-7.25-5.71A13.92 13.92 0 0 1 24 38.5c-5.88 0-10.85-3.89-12.54-9.27l-8.28 6.35C7.26 39.38 14.88 45.5 24 45.5z" fill="#34A853" /></svg>
  Login with Google
</button>

  </div>
  <div className="mt-6 text-center">
    <a href="#" className="text-blue-500 hover:underline">Forgot your password?</a>
  </div>
</div>

</div>

  );
}

export default Home;