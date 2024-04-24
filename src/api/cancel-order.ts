import { api } from '@/lib/axios'

export interface GetOrderCancelParams {
  orderId: string
}

export async function cancelOrder({ orderId }: GetOrderCancelParams) {
  const response = await api.patch(`/orders/${orderId}/cancel`)

  return response.data
}
