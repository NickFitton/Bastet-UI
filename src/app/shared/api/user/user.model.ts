export class UserModel {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date;

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
    return this.firstName.substr(0, 1).toUpperCase() + this.firstName.substring(1);
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
