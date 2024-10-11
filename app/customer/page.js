'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PlusCircle, Edit2, Trash2 } from 'lucide-react'

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: '',
  })
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [message, setMessage] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/customer'

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(apiUrl)
      setCustomers(response.data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedCustomer) {
        await axios.put(apiUrl, {
          ...formData,
          _id: selectedCustomer._id,
        })
        setMessage('Customer updated successfully')
      } else {
        await axios.post(apiUrl, formData)
        setMessage('Customer created successfully')
      }
      setFormData({
        name: '',
        dateOfBirth: '',
        memberNumber: '',
        interests: '',
      })
      setSelectedCustomer(null)
      fetchCustomers()
    } catch (error) {
      console.error('Error saving customer:', error)
      setMessage('Error saving customer')
    }
  }

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      dateOfBirth: customer.dateOfBirth.split('T')[0],
      memberNumber: customer.memberNumber,
      interests: customer.interests,
    })
    setSelectedCustomer(customer)
  }

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(apiUrl, { data: { _id: customerId } })
      setMessage('Customer deleted successfully')
      fetchCustomers()
    } catch (error) {
      console.error('Error deleting customer:', error)
      setMessage('Error deleting customer')
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          Customer Management
        </h1>

        <div className='bg-white shadow rounded-lg p-6 mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            {selectedCustomer ? 'Update Customer' : 'Create Customer'}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='dateOfBirth'
                className='block text-sm font-medium text-gray-700'
              >
                Date of Birth
              </label>
              <input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='memberNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Member Number
              </label>
              <input
                type='text'
                id='memberNumber'
                name='memberNumber'
                value={formData.memberNumber}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='interests'
                className='block text-sm font-medium text-gray-700'
              >
                Interests
              </label>
              <input
                type='text'
                id='interests'
                name='interests'
                value={formData.interests}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <button
              type='submit'
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <PlusCircle className='h-5 w-5 mr-2' />
              {selectedCustomer ? 'Update Customer' : 'Create Customer'}
            </button>
          </form>
        </div>

        {message && (
          <div
            className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8'
            role='alert'
          >
            <p>{message}</p>
          </div>
        )}

        <div className='bg-white shadow rounded-lg overflow-hidden'>
          <h2 className='text-xl font-semibold text-gray-900 p-6 bg-gray-50 border-b border-gray-200'>
            Customer List
          </h2>
          <ul className='divide-y divide-gray-200'>
            {customers.map((customer) => (
              <li key={customer._id} className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      {customer.name}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      Born:{' '}
                      {new Date(customer.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Member #: {customer.memberNumber}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Interests: {customer.interests}
                    </p>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(customer)}
                      className='inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <Edit2 className='h-5 w-5' />
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className='inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    >
                      <Trash2 className='h-5 w-5' />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
