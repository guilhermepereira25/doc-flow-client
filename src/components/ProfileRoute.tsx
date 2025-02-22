import { Navigate, Outlet } from 'react-router';
import useProfile from '@/hooks/useProfile';
import { type ProfileEnum } from '@/lib/schemas/profile.schema';

interface ProfileRouteProps {
  profile: ProfileEnum[];
}

const ProfileRoute = ({ ...props }: ProfileRouteProps) => {
  const { profile } = useProfile();
  return props.profile.includes(profile) ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" />
  );
};

export default ProfileRoute;
