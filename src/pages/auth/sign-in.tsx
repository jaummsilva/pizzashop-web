import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginFormSchema = z.object({
  email: z.string().email(),
})
type LoginFormInputs = z.infer<typeof loginFormSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: LoginFormInputs) {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
      toast.success('Enviamos um link de autenticação para seu e-mail')
    } catch {
      toast.error('Credencias invalidas!', {
        action: {
          label: 'Reenviar',
          onClick: () => handleLogin(data),
        },
      })
    }
  }

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
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
            <Button
              disabled={isSubmitting}
              variant="default"
              type="submit"
              className="w-full"
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
