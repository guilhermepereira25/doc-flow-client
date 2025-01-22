import AuthService from '../services/auth.service';

export const getAccessToken = async (username: string, password: string) => {
  try {
    const authServiceInstance = new AuthService();
    const data = await authServiceInstance.singin(username, password);
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const singup = async (username: string, password: string) => {
  try {
    const authServiceInstance = new AuthService();
    const data = await authServiceInstance.singup(username, password);
    return data;
  } catch (err) {
    console.error(err);
  }
};
