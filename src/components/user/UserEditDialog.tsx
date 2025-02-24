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
import { useForm } from 'react-hook-form';
import { CreateUser, createUserSchema } from '@/lib/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import useProfile from '@/hooks/useProfile';
import { updateUserPatchVerb } from '@/api/data/users.data';
import useUser from '@/hooks/useUser';
import useProfiles from '@/hooks/useProfiles';

export default function UserEditDialog() {
  const profiles = useProfiles();
  const { user } = useUser();
  const { isUserProfileAdminOrProfessor } = useProfile();

  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: async () => {
      return {
        fullName: user?.full_name || '',
        email: user?.email || '',
        enrollment: user?.enrollment || '',
        profile_id: user?.profile_id || '',
      };
    },
  });

  const handleSubmit = async (data: CreateUser) => {
    if (!user) return;
    const updatedUser = await updateUserPatchVerb(user.id, data);
    if (updatedUser) {
      toast.success('Usuário atualizado com sucesso');
      return;
    }
    toast.error('Erro ao atualizar usuário');
  };

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
        <Form {...form}>
          <form id="user-edit" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                defaultValue={user?.full_name || ''}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          'rounded-2xl bg-white bg-opacity-60',
                          form.formState.errors?.fullName &&
                            'border-destructive',
                          'col-span-3'
                        )}
                        type="text"
                        placeholder="Nome completo"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                defaultValue={user?.email || ''}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Email</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          'rounded-2xl bg-white bg-opacity-60',
                          form.formState.errors?.email && 'border-destructive',
                          'col-span-3'
                        )}
                        type="email"
                        placeholder="Email"
                        {...field}
                        onInput={() => {
                          if (form.formState.errors.email?.message) {
                            toast.error(form.formState.errors.email.message);
                          }
                        }}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enrollment"
                defaultValue={user?.enrollment || ''}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Matricula</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          'rounded-2xl bg-white bg-opacity-60',
                          form.formState.errors.enrollment?.message &&
                            'border-destructive',
                          'col-span-3'
                        )}
                        type="text"
                        placeholder="Matricula"
                        {...field}
                        onInput={() => {
                          if (form.formState.errors.enrollment?.message) {
                            toast.error(
                              form.formState.errors.enrollment.message
                            );
                          }
                        }}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profile_id"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Perfil</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={!isUserProfileAdminOrProfessor}
                      >
                        <SelectTrigger className="col-span-3 rounded-2xl">
                          <SelectValue placeholder="Selecione um perfil" />
                        </SelectTrigger>

                        <SelectContent>
                          {profiles.map((profile) => (
                            <SelectItem key={profile.id} value={profile.id}>
                              {profile.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-sky-900 rounded-2xl text-white"
                form="user-edit"
              >
                Salvar alterações
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
