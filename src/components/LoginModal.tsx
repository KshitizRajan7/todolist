"use client"
import React, { useState } from 'react'

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (username: string , password : string) => void;
    openRegistrationForm:()=>void; 
}

const LoginModal:React.FC<LoginModalProps> = ({isOpen,onClose,onLogin,openRegistrationForm}) => {
const [username,setUsername] = useState("");
const [password,setPassword] = useState('');

const handleSubmit =(e: React.FormEvent) =>{
    e.preventDefault();
    onLogin(username,password);
}
  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
        <h2 className="text-xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
           <div className='flex gap-5 mt-5'><span>No Account?</span><span className='text-green-600 cursor-pointer' onClick={openRegistrationForm}>Register</span></div>
        </form>
      </div>
    </div>
  ) : null;
};

export default LoginModal
