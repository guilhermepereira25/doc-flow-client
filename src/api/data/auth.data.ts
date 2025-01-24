import AuthService from '../services/auth.service';

export const getAccessToken = async (email: string, password: string) => {
  try {
    const authServiceInstance = new AuthService();
    const data = await authServiceInstance.singin(email, password);
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const singup = async (email: string, password: string) => {
  try {
    const authServiceInstance = new AuthService();
    const data = await authServiceInstance.singup(email, password);
    return data;
  } catch (err) {
    console.error(err);
  }
};
