'use client'

import { LoginForm } from '@/components/auth/login-form'
import { AdminPanel } from '@/components/admin-panel'
import { useAuthStore } from '@/zustand/admin-store'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if ( typeof window !== 'undefined'){
      isAuthenticated = localStorage.getItem('isAuthenticated')
    }
  })
  return isAuthenticated ? <AdminPanel /> : <LoginForm />
} 
