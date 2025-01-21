import AbstractService from './abstract.service';
import Service from './service';

export default class AuthService extends AbstractService {
  constructor() {
    super('/auth');
  }

  async singin(email: string, password: string) {
    return Service.post(this.basePath + '/singin', { email, password });
  }

  async singup(email: string, password: string) {
    return Service.post(this.basePath + '/singup', { email, password });
  }

  async logout() {
    return Service.post(this.basePath + '/logout', {});
  }
}
