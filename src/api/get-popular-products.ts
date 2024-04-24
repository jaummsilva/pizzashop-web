import { api } from '@/lib/axios'

export type GetPopularProdutcsResponse = {
  product: string | null
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<GetPopularProdutcsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
