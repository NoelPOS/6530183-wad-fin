'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function CustomerDetails() {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  console.log(params.slug)
  const router = useRouter()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/customer'

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${params.slug}`)
        setCustomer(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching customer:', error)
        setError('Failed to load customer details')
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [params.id])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-600'>
        {error}
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <button
          onClick={() => router.back()}
          className='mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <ArrowLeft className='h-5 w-5 mr-2' />
          Back to Customer List
        </button>

        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Customer Details
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Personal information and interests.
            </p>
          </div>
          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Full name</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer.name}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Date of Birth
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {new Date(customer.dateOfBirth).toLocaleDateString()}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Member Number
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer.memberNumber}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Interests</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer.interests}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
