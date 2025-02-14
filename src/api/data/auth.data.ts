import AuthService from '../services/auth.service';
import type { paths, components } from '@/lib/schema';

type AuthSigninResponse = components['schemas']['AccessTokenResponseDto'];
type AuthSignupResponse = components['schemas']['AccessTokenResponseDto'];

type AuthSigninBody = paths['/auth/signin']['post']['requestBody']['content']['application/json'];
type AuthSignupBody = paths['/auth/signup']['post']['requestBody']['content']['application/json'];

export const getAccessToken = async ({ email, password }: AuthSigninBody): Promise<string | undefined> => {
  try {
    const authServiceInstance = new AuthService();
    const data: AuthSigninResponse = await authServiceInstance.singin(email, password);
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async ({ email, password, enrollment, fullName }: AuthSignupBody): Promise<string | undefined> => {
  try {
    const authServiceInstance = new AuthService();
    const data: AuthSignupResponse = await authServiceInstance.signup(email, password, enrollment, fullName);
    return data.access_token;
  } catch (err) {
    console.error(err);
  }
};
