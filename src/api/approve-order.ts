import { api } from '@/lib/axios'

export interface GetOrderApproveParams {
  orderId: string
}

export async function approveOrder({ orderId }: GetOrderApproveParams) {
  const response = await api.patch(`/orders/${orderId}/approve`)

  return response.data
}
