import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { CreateUser, createUserSchema, User } from '@/lib/schemas/user.schema';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getUser } from '@/api/data/users.data';
import { toast } from 'sonner';
import { Select } from '../ui/select';

export default function UserEditDialog() {
  const [loadedUser, setLoadedUser] = useState<User | null>(null);
  const { user } = useAuth();

  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      enrollment: loadedUser?.enrollment || '',
      profile_id: user?.profile.name || '',
    },
  });

  const fetchUser = async () => {
    if (!user) return;
    const currentUser = await getUser(user.sub);
    if (currentUser) {
      if (import.meta.env.DEV) toast.info('Usuário carregado com sucesso');
      setLoadedUser(currentUser);
      return;
    }
    toast.error('Erro ao carregar usuário');
  }

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && form.reset()}>
      <DialogTrigger>
        <Button
          variant="link"
          className="mr-2 bg-white border border-neutral-400 rounded-lg w-52"
        >
          Editar dados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações pessoais, depois clique em "Salvar
            alterações"
          </DialogDescription>
        </DialogHeader>
          <form onSubmit={form.handleSubmit((data) => data)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Nome completo
                </Label>
                <Input
                  id="fullName"
                  {...form.register('fullName')}
                  placeholder="Nome completo"
                  defaultValue={user?.fullName}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  {...form.register('email')}
                  placeholder="Email"
                  defaultValue={user?.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="enrollment" className="text-right">
                  Matricula
                </Label>
                <Input
                  id="enrollment"
                  {...form.register('enrollment')}
                  placeholder="1111222SINF"
                  defaultValue={loadedUser?.enrollment || ''}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='profile' className='text-right'>
                  Perfil
                </Label>
                <Select>
                  
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-sky-900 rounded-2xl text-white"
              >
                Salvar alterações
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  );
}
