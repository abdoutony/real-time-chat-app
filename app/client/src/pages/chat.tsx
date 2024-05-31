import React ,{useEffect,useState}from 'react'
import useFetch from '../lib/hooks/useFetch'
import { handleLogout } from '../services/auth.service'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
type MessageOrder = 'yes' | 'no';
type DataMessagesType ={
  data:{
    firstname:string,
    lastname:string,
    message:string,
    currentUserMessage:MessageOrder
  } []
}
type MessageType ={
  firstname:string,
  lastname:string,
  message:string,
  currentUserMessage:MessageOrder
}
export default function Chat() {
  const {data,loading,error}= useFetch("/message")
  const [response, setResponse] = useState("");
  const [message,setMessage] = useState<string>("")

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  console.log(data)
  const handleSendMessage = (e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const socket = socketIOClient(ENDPOINT);
    socket.emit("message",message)
  }

  const messageOrderDisplay = (data: MessageType) => {
    return {
      no: <div className="flex items-start space-x-4">
        <div className="bg-gray-200 p-3 rounded-lg shadow-md w-1/2">
          <p className='font-bold text-sm'>{data.firstname} {data.lastname}</p>
          <p className="text-gray-800">{data.message}</p>
     
        </div>
      </div>,
      yes: <div className="flex items-end justify-end space-x-4">
        <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md w-1/2">
        <p className='font-bold text-sm'>{data.firstname} {data.lastname}</p>
          <p className="text-slate-200">{data.message}</p>
        </div>
      </div>
    };
  };
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
      {data && (data as DataMessagesType)?.data?.length > 1 && (data as DataMessagesType)?.data?.map((el: MessageType,index) => {
  const { currentUserMessage } = el;
  return <div key={index}>{messageOrderDisplay(el)[currentUserMessage]}</div>;
})}

      {/* Message from others */}
      {/* <div className="flex items-start space-x-4">
        <div className="bg-gray-200 p-3 rounded-lg shadow-md">
          <p className="text-gray-800">Hello! How are you?</p>
        </div>
      </div> */}
      {/* Message from user */}
      {/* <div className="flex items-end justify-end space-x-4">
        <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md">
          <p>I'm good, thanks! How about you?</p>
        </div>
      </div> */}
      {/* More messages here */}
    </div>
    {/* Input area */}
    <div className="bg-gray-200 p-4 rounded-b-lg flex items-center space-x-4">
      <input type="text"
      onChange={(e)=>setMessage(e.target.value)}
       placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button 
      onClick={handleSendMessage}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
    </div>
  </div>
</div>

  )
}
