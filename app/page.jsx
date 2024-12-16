'use client'

import { LoginForm } from '@/components/auth/login-form'
import { AdminPanel } from '@/components/admin-panel'
import { useAuthStore } from '@/zustand/admin-store'
import { useEffect } from 'react'

export default function AdminPage() {
  // const isAuthenticated = true
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  return isAuthenticated ? <AdminPanel /> : <LoginForm />
} 
