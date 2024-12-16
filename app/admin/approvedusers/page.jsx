'use client'
import { Sidebar } from '@/components/ui/sidebar'
import { Header } from '@/components/ui/header'
import { SearchBar } from '@/components/ui/search-bar'
import { UserTable } from '@/components/ui/approved-user-table'
import { useEffect } from 'react'
import { useAuthStore } from '@/zustand/admin-store'
import { useRouter } from 'next/navigation'

export default function AdminEvents() {
  const router = useRouter()
  

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [])


  return (
    <div className='min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='ml-16'>
        <Header />
        <main className='p-6'>
          <div className='bg-white rounded-lg shadow'>
            <SearchBar selected={2} />
            <UserTable />
          </div>
        </main>
      </div>
    </div>
  )
}
