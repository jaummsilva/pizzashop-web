import { api } from '@/lib/axios'

export interface GetDailyReceiptInPeriodProps {
  from?: Date
  to?: Date
}

export type GetDailyReceiptInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyReceiptInPeriod({
  from,
  to,
}: GetDailyReceiptInPeriodProps) {
  const response = await api.get<GetDailyReceiptInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
