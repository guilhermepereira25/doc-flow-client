import useAuth from "./useAuth"

const useProfile = () => {
    const { user } = useAuth();
    if (!user) {
        throw new Error('useProfile must be used within a AuthProvider');
    }
    return user?.profile.name;
}

export default useProfile;