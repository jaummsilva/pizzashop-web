import { SelectTrigger } from '@radix-ui/react-select'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input id="id" placeholder="ID do pedido" className="h-8 w-auto" />
      <Input
        id="clientName"
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
      />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em Preparo</SelectItem>
          <SelectItem value="delivering">Em Entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      <Button type="button" variant="outline" size="xs" className="ms-4">
        <Search className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
