import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FormSchema } from '@/pages/auth/Login';
import type { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  form: ReturnType<typeof useForm<FormSchema>>;
  onSubmit: (data: FormSchema) => void;
}

export default function AuthForm({ form, onSubmit }: AuthFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'rounded-2xl bg-white bg-opacity-60',
                    form.formState.errors.email && 'border-destructive'
                  )}
                  type="email"
                  placeholder="email"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'rounded-2xl bg-white bg-opacity-60',
                    form.formState.errors.password && 'border-destructive'
                  )}
                  type="password"
                  placeholder="password"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-sky-900 text-white hover:bg-sky-700"
          type="submit"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}
