'use client'

import { LoginForm } from '@/components/auth/login-form'
import { AdminPanel } from '@/components/admin-panel'
import { useAuthStore } from '@/zustand/admin-store'
import { useEffect, useState } from 'react'
import { set } from 'mongoose'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if ( typeof window !== 'undefined'){
      setIsAuthenticated(localStorage.getItem('isAuthenticated'))
    }
  })
  return isAuthenticated ? <AdminPanel /> : <LoginForm />
} 
