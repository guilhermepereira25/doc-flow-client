import AuthService from '../services/auth.service';

export const singin = async (email: string, password: string) => {
  try {
    const authServiceInstance = new AuthService();
    return await authServiceInstance.singin(email, password);
  } catch (error) {
    return error;
  }
};

export const singup = async (username: string, password: string) => {
  try {
    const authServiceInstance = new AuthService();
    return await authServiceInstance.singup(username, password);
  } catch (err) {
    return err;
  }
};
