'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const CustomerView = () => {
  const router = useRouter()
  const { id } = router.query // Extract ID from the URL
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return // Prevent fetch if id is not available
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`
        const response = await axios.get(apiUrl)
        setCustomer(response.data)
      } catch (err) {
        setError('Failed to load customer data')
        console.error('Error fetching customer:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  // Check if the component is loading or if there was an error
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  // If customer data is not found
  if (!customer) return <p>Customer not found</p>

  // Display customer details
  return (
    <div>
      <h1>Customer Details</h1>
      <p>
        <strong>Name:</strong> {customer.name}
      </p>
      <p>
        <strong>Date of Birth:</strong>{' '}
        {new Date(customer.dateOfBirth).toLocaleDateString()}
      </p>
      <p>
        <strong>Member Number:</strong> {customer.memberNumber}
      </p>
      <p>
        <strong>Interests:</strong> {customer.interests}
      </p>
    </div>
  )
}

export default CustomerView
