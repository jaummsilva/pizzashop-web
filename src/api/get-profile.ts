import { api } from '@/lib/axios'

interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: string
  updatedAt: string
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
