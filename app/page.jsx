'use client'

import { LoginForm } from '@/components/auth/login-form'
import { AdminPanel } from '@/components/admin-panel'
import { useAuthStore } from '@/zustand/admin-store'

export default function AdminPage() {
  // const isAuthenticated = true

  const {user, isAuthenticated, login, logout} = useAuthStore()
  console.log('user', user)
  console.log('isAuthenticated', isAuthenticated)
  console.log('login', login)
  console.log('logout', logout)
  return isAuthenticated ? <AdminPanel /> : <LoginForm />
} 
