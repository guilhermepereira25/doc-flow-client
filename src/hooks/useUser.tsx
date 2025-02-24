import useAuth from './useAuth';
import { useCallback, useEffect, useState } from 'react';
import { getUser } from '@/api/data/users.data';
import { toast } from 'sonner';
import { User } from '@/lib/schemas/user.schema';

interface UseUser {
    user: User | null;
    setUser: (user: User | null) => void;
}

const useUser = (): UseUser => {
    const [loadedUser, setLoadedUser] = useState<User | null>(null);
    const { user } = useAuth();
    if (!user) {
        throw new Error('useUser must be used within an AuthProvider');
    }

    const fetchUser = useCallback(async () => {
        const currentUser = await getUser(user.sub);
        if (currentUser) {
            if (import.meta.env.DEV) toast.info('Usuário carregado com sucesso');
            setLoadedUser(currentUser);
            return;
        }
        toast.error('Erro ao carregar usuário');
    }, [user.sub]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user: loadedUser,
        setUser: setLoadedUser,
    }
};

export default useUser;