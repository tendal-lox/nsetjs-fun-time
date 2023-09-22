import { Exclude } from 'class-transformer';

export class SerializedUser {
  username: string;

  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
      Object.assign(this, partial)
  }
}
