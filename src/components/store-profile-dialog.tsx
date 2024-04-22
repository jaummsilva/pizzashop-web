import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileFormSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
})

type StoreProfileFormInputs = z.infer<typeof storeProfileFormSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managedRestaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileFormInputs>({
    resolver: zodResolver(storeProfileFormSchema),
    values: {
      description: managedRestaurant?.description ?? '',
      name: managedRestaurant?.name ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileFormInputs) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managedRestaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managedRestaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  async function handleStoreProfile(data: StoreProfileFormInputs) {
    try {
      await updateProfileFn({ name: data.name, description: data.description })
      toast.success('Perfil editado com sucesso!')
    } catch {
      toast.error('Erro ao editar perfil!')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>
      <form action="" onSubmit={handleSubmit(handleStoreProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input {...register('name')} className="col-span-3" id="name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              {...register('description')}
              className="col-span-3"
              id="description"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isSubmitting} variant="destructive" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} variant="success" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
