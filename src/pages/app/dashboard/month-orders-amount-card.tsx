import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import {
  getMonthOrdersAmount,
  GetMonthOrdersAmountResponse,
} from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
  const { data: result } = useQuery<GetMonthOrdersAmountResponse>({
    queryKey: ['monthOrdersAmount'],
    queryFn: () => getMonthOrdersAmount(),
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {result?.amount}
        </span>
        <p className="text-xs text-muted-foreground">
          {result?.diffFromLastMonth && result.diffFromLastMonth > 0 && (
            <span className="dark:text--400 text-emerald-500">
              {result.diffFromLastMonth}%
            </span>
          )}
          {result?.diffFromLastMonth && result.diffFromLastMonth === 0 && (
            <span className="dark:text--400 text-gray-400-500">
              {result.diffFromLastMonth}%
            </span>
          )}
          {result?.diffFromLastMonth && result.diffFromLastMonth < 0 && (
            <span className="dark:text--400 text-rose-500">
              {result.diffFromLastMonth}%
            </span>
          )}{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
