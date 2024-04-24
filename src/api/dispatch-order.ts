import { api } from '@/lib/axios'

export interface GetOrderDispatchParams {
  orderId: string
}

export async function dispatchOrder({ orderId }: GetOrderDispatchParams) {
  const response = await api.patch(`/orders/${orderId}/dispatch`)

  return response.data
}
