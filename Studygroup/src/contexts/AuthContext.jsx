import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('userId')) || null
  })

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn)
    localStorage.setItem('userId', JSON.stringify(user) || '')
    console.log("auth\n",user)
  }, [isLoggedIn, user])


  return (
    <AuthContext.Provider value={{ user,setUser,isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}