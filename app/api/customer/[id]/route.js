import Customer from '@/models/Customer'

export async function GET(request, { params }) {
  const { id } = params // Extract the id from the URL parameters

  try {
    const customer = await Customer.findById(id)
    if (!customer) {
      return new Response('Customer not found', { status: 404 })
    }
    return Response.json(customer)
  } catch (error) {
    console.error('Error fetching customer:', error)
    return new Response('Server Error', { status: 500 })
  }
}
