import { api } from '@/lib/axios'

export interface GetManagedRestaurantResponse {
  name: string
  id: string
  createdAt: string
  updatedAt: string
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return response.data
}
