import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import logo from '../../assets/cefet-logo.png';
import { Button } from '@/components/ui/button';

export default function Login() {
  const form = useForm();

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="logo">
        <img className="h-20" src={logo} alt="Logo" />
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="userhappy" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
