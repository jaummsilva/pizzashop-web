import { api } from '@/lib/axios'

export interface GetOrderDeliverParams {
  orderId: string
}

export async function deliverOrder({ orderId }: GetOrderDeliverParams) {
  const response = await api.patch(`/orders/${orderId}/deliver`)

  return response.data
}
