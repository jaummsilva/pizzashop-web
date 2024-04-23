import { api } from '@/lib/axios'

export interface GetOrderDetailsParams {
  orderId: string
}

export async function cancelOrder({ orderId }: GetOrderDetailsParams) {
  const response = await api.patch(`/orders/${orderId}/cancel`)

  return response.data
}
