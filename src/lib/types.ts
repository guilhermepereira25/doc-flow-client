import { z } from "zod";

export const roleSchema = z.object({
    id: z.string(),
    name: z.string(),
    profiles_roles: z.object({
        createdAt: z.string(),
        updatedAt: z.string(),
        profile_id: z.string(),
        role_id: z.string(),
    })
});

export const profileSchema = z.object({
    id: z.string(),
    name: z.string(),
    roles: z.array(roleSchema),
});

export const userPayloadSchema = z.object({
    sub: z.string(),
    email: z.string(),
    profile: profileSchema
});

export type UserPayload = z.infer<typeof userPayloadSchema>;

export interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: UserPayload | null;
    logout: () => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const authFormSchema = z.object({
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

export type AuthFormSchema = z.infer<typeof authFormSchema>;