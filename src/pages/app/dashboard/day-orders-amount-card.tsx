import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import {
  getDayOrdersAmount,
  GetDayOrdersAmountResponse,
} from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
  const { data: result } = useQuery<GetDayOrdersAmountResponse>({
    queryKey: ['dayOrdersAmount'],
    queryFn: () => getDayOrdersAmount(),
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {result?.amount}
        </span>
        <p className="text-xs text-muted-foreground">
          {result?.diffFromYesterday && result.diffFromYesterday > 0 && (
            <span className="dark:text--400 text-emerald-500">
              {result.diffFromYesterday}%
            </span>
          )}
          {result?.diffFromYesterday && result.diffFromYesterday === 0 && (
            <span className="dark:text--400 text-white-500">
              {result.diffFromYesterday}%
            </span>
          )}
          {result?.diffFromYesterday && result.diffFromYesterday < 0 && (
            <span className="dark:text--400 text-rose-500">
              {result.diffFromYesterday}%
            </span>
          )}{' '}
          em relação a ontem
        </p>
      </CardContent>
    </Card>
  )
}
