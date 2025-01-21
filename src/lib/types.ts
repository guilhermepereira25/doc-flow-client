export interface User {
    username: string;
    password: string;
    profiles: string[];
}

export interface AuthContextType {
    token: string | null;
    logout: () => void;
    isAuthenticated: boolean;
}