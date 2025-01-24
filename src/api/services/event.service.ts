import AbstractService from './abstract.service';

export default class AuthService extends AbstractService {
  constructor() {
    super('/auth', true);
  }

  async singin(email: string, password: string) {
    return await this.api.post(this.basePath + '/signin', { email, password });
  }

  async singup(email: string, password: string) {
    return await this.api.post(this.basePath + '/singup', { email, password });
  }
}
