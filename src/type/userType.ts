import { Exclude } from 'class-transformer';

export class SerializedUser {
  username: string;

  email: string;

  @Exclude()
  role: string

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
