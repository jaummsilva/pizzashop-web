import { useQuery } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  getPopularProducts,
  GetPopularProdutcsResponse,
} from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PopularProductsChart() {
  const { data: result, isLoading: isLoadingPopularProducts } =
    useQuery<GetPopularProdutcsResponse>({
      queryKey: ['popularProducts'],
      queryFn: () => getPopularProducts(),
    })

  const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.rose[500],
    colors.emerald[500],
  ]
  return (
    <Card className="col-span-3">
      <CardHeader className=" pb-8">
        <div className="flex items-center justify-between space-y-1">
          <CardTitle className="text-base font-medium ">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingPopularProducts ? (
          <Skeleton style={{ width: '100%', height: 240 }} />
        ) : (
          result && (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart style={{ fontSize: 12 }}>
                <Pie
                  nameKey="product"
                  data={result}
                  type="linear"
                  strokeWidth={8}
                  dataKey="amount"
                  cx="50%"
                  cy="50%"
                  outerRadius={86}
                  innerRadius={64}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180
                    const radius =
                      12 + innerRadius + (outerRadius - innerRadius)
                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                    const y = cy + radius * Math.sin(-midAngle * RADIAN)

                    return (
                      <text
                        x={x}
                        y={y}
                        className="fill-muted-foreground text-xs"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {result[index].product.length > 12
                          ? result[index].product.substring(0, 12).concat('...')
                          : result[index].product}{' '}
                        ({value})
                      </text>
                    )
                  }}
                >
                  {result.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      className="stroke-background hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )
        )}
      </CardContent>
    </Card>
  )
}
