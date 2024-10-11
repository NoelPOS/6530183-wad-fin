'use client'
import React from 'react'

const data = `import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    memberNumber: {
      type: Number,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
  },
  { strict: false }
)

const Customer =
  mongoose.models.customer || mongoose.model('customer', customerSchema)

export default Customer
`

const page = () => {
  return (
    <div>
      <pre>
        <code>${data}</code>
      </pre>
    </div>
  )
}

export default page
