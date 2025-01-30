import AuthService from '../services/auth.service';
import type { paths, components } from '@/lib/schema';

type AuthSigninResponse = components['schemas']['AuthResponseDto'];
type AuthSignupResponse = components['schemas']['AuthResponseDto'];

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

export const singup = async ({ email, password }: AuthSignupBody): Promise<string | undefined> => {
  try {
    const authServiceInstance = new AuthService();
    const data: AuthSignupResponse = await authServiceInstance.singup(email, password);
    return data.access_token;
  } catch (err) {
    console.error(err);
  }
};
