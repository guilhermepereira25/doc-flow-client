import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAccessToken } from "@/api/data/auth.data";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { authFormSchema, type AuthFormSchema } from "@/lib/types";
import useAuthError from "@/hooks/useAuthError";

export default function Login() {
  const navigate = useNavigate();
  const { checkAuthentication } = useAuth();
  const { setError } = useAuthError();

  const form = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: AuthFormSchema) => {
    const accessToken = await getAccessToken({ ...data });
    if (!accessToken) {
      setError("Não foi possível fazer login. Tente novamente.");
      return;
    }
    localStorage.setItem("accessToken", accessToken);
    await checkAuthentication();
    navigate("/events");
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit} form={form} />

      <p className="text-sky-900">Não possui conta?</p>
      <Button
        className="w-full bg-sky-900 text-white hover:bg-sky-800 rounded-2xl"
        onClick={() => navigate("/signup")}
      >
        Cadastrar
      </Button>
    </>
  );
}
