import { z } from "zod";

export interface ApiResponse<T> {
    status: number;
    success: boolean;
    error: string | null;
    data: T;
};

export const userSchema = z.object({
    id: z.string(),
    email: z.string().email().regex(/@cefet-rj.br$/),
    password: z.string().min(8),
    enrollment: z.string().regex(/\d{4}\d{3}\w{3}/),
    profile_id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const eventsSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: z.string(),
    start_at: z.string(),
    end_at: z.string(),
});

export type Event = z.infer<typeof eventsSchema>;

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