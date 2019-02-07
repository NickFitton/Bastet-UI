export class UserModel {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: string;
  private readonly password: string;
  private readonly createdAt: Date;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getFormattedName(): string {
    const fNameUpper = this.getFirstName().substr(0, 1).toUpperCase();
    const lNameUpper = this.getLastName().substr(0, 1).toUpperCase() + this.getLastName().substr(1, this.getLastName().length);
    return fNameUpper + '. ' + lNameUpper;
  }
}
