import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAccessToken } from '@/api/data/auth.data';
import { useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';
import AuthForm from '@/components/AuthForm';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Insira um email válido.',
    })
    .regex(/@cefet-rj.br$/, {
      message: 'Insira um email institucional.',
    }),
  password: z.string().min(2, {
    message: 'A senha deve ter no mínimo 8 caracteres.',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>('');

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: FormSchema) => {
    const accessToken = await getAccessToken(data.email, data.password);
    if (!accessToken) {
      setError('Não foi possível fazer login. Tente novamente.');
      return;
    }
    localStorage.setItem('accessToken', accessToken);
    setToken(accessToken);
    setIsAuthenticated(true);
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    const texts = [
      'Acesse seu evento',
      'Crie e adicione eventos',
      'Acesse, crie e adicione eventos',
    ];
    let index = 0;
    const interval = setInterval(() => {
      setText(texts[index]);
      index = index === texts.length - 1 ? 0 : index + 1;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[400px] space-y-3">
      <h2 className="text-center text-4xl text-sky-900 transition-opacity duration-5000 ease-in-out opacity-0 animate-fade-in-out">
        {text}
      </h2>
      <p className="text-center text-base text-sky-900">
        Acesse, crie e adicione eventos
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ah, não</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <AuthForm onSubmit={handleSubmit} form={form} />

      <p className="text-sky-900">Não possui conta?</p>
      <Button
        className="w-full bg-sky-900 text-white hover:bg-sky-800"
        onClick={() => navigate('/signup')}
      >
        Cadastrar
      </Button>
    </div>
  );
}
