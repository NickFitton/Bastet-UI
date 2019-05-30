export class ChangePasswordConfig {
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }
}
