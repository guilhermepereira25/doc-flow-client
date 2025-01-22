import AbstractService from './abstract.service';
import Service from './service';

export default class AuthService extends AbstractService {
  constructor() {
    super('/auth');
  }

  async singin(username: string, password: string) {
    return Service.post(this.basePath + '/signin', { username, password });
  }

  async singup(username: string, password: string) {
    return Service.post(this.basePath + '/singup', { username, password });
  }

  async logout() {
    return Service.post(this.basePath + '/logout', {});
  }
}
