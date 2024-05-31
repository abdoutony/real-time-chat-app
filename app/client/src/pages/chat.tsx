import React from 'react'
import useFetch from '../lib/hooks/useFetch'
import { handleLogout } from '../services/auth.service'
export default function Chat() {
  const {data,loading,error} = useFetch("/message")
  console.log(data)
  return (
   <div className="bg-gray-100 h-screen flex items-center justify-center">
  {/* Chat Container */}
  <div className="w-full max-w-3xl h-full bg-white shadow-lg rounded-lg flex flex-col">
    {/* Header */}
    <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg flex items-center justify-between">
      <h1 className="text-xl font-semibold">Chat</h1>
      <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded" onClick={()=>handleLogout()}>Logout</button>
    </div>
    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* Message from others */}
      <div className="flex items-start space-x-4">
        <div className="bg-gray-200 p-3 rounded-lg shadow-md">
          <p className="text-gray-800">Hello! How are you?</p>
        </div>
      </div>
      {/* Message from user */}
      <div className="flex items-end justify-end space-x-4">
        <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md">
          <p>I'm good, thanks! How about you?</p>
        </div>
      </div>
      {/* More messages here */}
    </div>
    {/* Input area */}
    <div className="bg-gray-200 p-4 rounded-b-lg flex items-center space-x-4">
      <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
    </div>
  </div>
</div>

  )
}
