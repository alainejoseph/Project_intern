import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true'
  })

  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem('user')) || null
  })

  // Sync to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn)
    sessionStorage.setItem('user', JSON.stringify(user) || '')
    console.log("auth\n",user)
  }, [isLoggedIn, user])


  return (
    <AuthContext.Provider value={{ user,setUser,isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}