export default abstract class AbstractService {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }
}
