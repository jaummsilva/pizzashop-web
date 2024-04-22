import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { signUp } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})
type SignUpFormInputs = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpFormInputs) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
      reset()
    } catch {
      toast.error('Erro ao cadastrar restaurante!')
    }
  }

  return (
    <div>
      <Helmet>
        <title>Cadastro</title>
      </Helmet>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Faça o login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Restauranete</Label>
              <Input
                {...register('restaurantName')}
                id="restaurantName"
                type="text"
                placeholder="Insira o nome do restaurante"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Usuário</Label>
              <Input
                {...register('managerName')}
                id="managerName"
                type="text"
                placeholder="Insira o nome do usuário"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Telefone</Label>
              <Input
                {...register('phone')}
                id="phone"
                type="tel"
                placeholder="Insira o telefone"
                required
              />
            </div>
            <Button
              disabled={isSubmitting}
              variant="default"
              type="submit"
              className="w-full"
            >
              Cadastre-se
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                {' '}
                termos de serviço
              </a>{' '}
              e
              <a href="" className="underline underline-offset-4">
                {' '}
                políticas de privacidade
              </a>{' '}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
