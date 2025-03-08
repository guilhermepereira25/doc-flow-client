import { ChangePasswordDto } from "@/lib/schemas/auth/change-password.schema";
import AbstractService from "./abstract.service";
export default class AuthService extends AbstractService {
  constructor() {
    super("/auth");
  }

  async singin(email: string, password: string) {
    return await this.api.post(this.basePath + "/signin", { email, password });
  }

  async signup(
    email: string,
    password: string,
    enrollment: string,
    fullName: string,
    profileId: string,
  ) {
    return await this.api.post(this.basePath + "/signup", {
      email,
      password,
      enrollment,
      fullName,
      profileId,
    });
  }

  async changePassword({ oldPassword, newPassword }: ChangePasswordDto) {
    return await this.api.post(this.basePath + "/change-password", {
      oldPassword,
      newPassword,
    });
  }
}
