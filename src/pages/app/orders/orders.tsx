import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingOrdersRestaurant } = useQuery({
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrders({ pageIndex }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())

      return prev
    })
  }

  return (
    <div>
      <Helmet>
        <title>Pedidos</title>
      </Helmet>
      <div className="mb-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>
      <Separator />
      <div className="mt-4 space-y-2.5">
        <OrderTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado já</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do Pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingOrdersRestaurant ? (
                <Skeleton />
              ) : (
                result &&
                result.orders.map((order) => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          onChangePage={handlePaginate}
          pageIndex={
            result && result.meta.pageIndex !== undefined
              ? result.meta.pageIndex
              : 0
          }
          perPage={
            result && result.meta.perPage !== undefined
              ? result.meta.perPage
              : 10
          } // Or whatever default value you want
          totalCount={
            result && result.meta.totalCount !== undefined
              ? result.meta.totalCount
              : 0
          } // Or whatever default value you want
        />
      </div>
    </div>
  )
}
