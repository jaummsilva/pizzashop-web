import { api } from '@/lib/axios'

export interface SignUpBody {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export async function signUp({
  restaurantName,
  managerName,
  phone,
  email,
}: SignUpBody) {
  await api.post('/restaurants', {
    restaurantName,
    managerName,
    phone,
    email,
  })
}
