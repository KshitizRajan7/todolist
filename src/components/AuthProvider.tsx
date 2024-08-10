"use client";
import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import CryptoJS from "crypto-js";
import LoginModal from "@/components/Modals/LoginModal";
import RegistrationModal from "./Modals/RegistrationModal";
import bg from  '../image/todolistwall1.jpg'

interface User {
  userID: number;
  username: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  userName: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.userID);
        setUserName(user.username);
        setAuthenticated(true);
      }
    } else {
      setLoginModalOpen(true);
    }
  }, []);

  const handleLogin = useCallback((username: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const user = users.find((u) => u.username === username && u.password === hashedPassword);

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
      setAuthenticated(true);
      setUserId(user.userID);
      setUserName(user.username);
      setLoginModalOpen(false);
    } else {
      alert("Invalid credentials");
    }
  }, []);

  const handleRegister = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const hashedPassword = CryptoJS.SHA256(password).toString(); 
    if (users.find((u:any) => u.username === username)) {
      alert("User already exists");
    } else {
      const newUser = {
        userID: Math.floor(Math.random() * 1000000),
        username,
        password: hashedPassword,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful. Please log in.");
      setRegistrationModalOpen(false);
      setLoginModalOpen(true);
    }
  };

  const handleCloseLoginModal = () => setLoginModalOpen(false);

  const handleCloseRegistrationModal = () => setRegistrationModalOpen(false);

  const openLoginModal = () => setLoginModalOpen(true);

  const openRegistrationModal = () => {
    setLoginModalOpen(false);
    setRegistrationModalOpen(true);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUserId(null);
    setUserName(null);
    setLoginModalOpen(true);
  };

  const containerStyle = {
    backgroundImage: `url(${bg.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    width: '100vw',  // Full viewport width
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userName, login: handleLogin, logout, register: handleRegister }}>
      <LoginModal
        isOpen={isLoginModalOpen && !isAuthenticated}
        onClose={handleCloseLoginModal}
        onLogin={handleLogin}
        openRegistrationForm={openRegistrationModal}
      />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        onRegister={handleRegister}
      />
      {isAuthenticated ? children : (
         <div style={containerStyle} className="text-center flex flex-col justify-center items-center ">
         <h1 className="font-kaint font-bold text-white text-9xl font-kanit">To-Do list</h1>
         <p className="text-white font-semibold font-kanit">Please log in to access the app.</p>
         <button onClick={openLoginModal} className="bg-green-600 p-2 rounded border-none text-white">Login</button>
       </div>
      )}   
    </AuthContext.Provider>
  );
};

export default AuthProvider;
