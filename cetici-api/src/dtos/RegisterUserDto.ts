import { Email, Required } from "@tsed/schema";

class RegisterUserDto {
  @Required()
  name: string;

  @Required()
  password: string;

  @Required()
  @Email()
  email: string;
}

export default RegisterUserDto;
