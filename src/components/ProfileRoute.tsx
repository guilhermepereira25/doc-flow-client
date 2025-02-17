import { Outlet } from 'react-router';
import useProfile from '@/hooks/useProfile';
import Forbidden from '@/pages/Forbidden';

interface ProfileRouteProps {
  profile: string[];
}

const ProfileRoute = ({ ...props }: ProfileRouteProps) => {
  const profile = useProfile();
  return (
    props.profile.includes(profile) ? <Outlet /> : <Forbidden /> 
  )
};

export default ProfileRoute;