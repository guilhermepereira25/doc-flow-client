import { ChangePasswordDto } from '@/lib/schemas/auth/change-password.schema';
import AuthService from '../services/auth.service';
import {
  AuthSigninResponse,
  AuthSignupResponse,
  AuthSigninBody,
  AuthSignupBody,
} from '@/lib/schemas/auth/index.schema';

const authServiceInstance = new AuthService();

export const getAccessToken = async ({ email, password }: AuthSigninBody): Promise<string | undefined> => {
  try {
    const data: AuthSigninResponse = await authServiceInstance.singin(email, password);
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async ({ email, password, enrollment, fullName }: AuthSignupBody): Promise<string | undefined> => {
  try {
    const data: AuthSignupResponse = await authServiceInstance.signup(email, password, enrollment, fullName);
    return data.access_token;
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = async ({ oldPassword, newPassword }: ChangePasswordDto): Promise<void | string> => {
  try {
    return await authServiceInstance.changePassword({ oldPassword, newPassword });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(error);
    }
    return 'Ocorreu um erro ao tentar alterar a senha';
  }
}