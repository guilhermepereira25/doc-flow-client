import useAuth from "./useAuth";
import { type ProfileEnum } from "@/lib/schemas/profile.schema";
import { superUsersProfiles } from "@/lib/utils";

const useProfile = (): {
  profile: ProfileEnum;
  isUserProfileAdminOrProfessor: boolean;
} => {
  const { user } = useAuth();
  if (!user) {
    throw new Error('useProfile must be used within a AuthProvider');
  }

  const profileName =
    user?.profile.name.charAt(0).toUpperCase() + user?.profile.name.slice(1);

  const isUserProfileAdminOrProfessor: boolean =
    superUsersProfiles.includes(profileName);

  return {
    profile: profileName as ProfileEnum,
    isUserProfileAdminOrProfessor,
  };
};

export default useProfile;
