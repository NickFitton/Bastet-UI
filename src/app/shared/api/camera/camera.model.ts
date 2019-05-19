export class CameraModel {
  public readonly id: string;
  public readonly ownedBy: string;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly lastActive: Date;

  constructor(
    id: string,
    ownedBy: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    lastActive: Date) {
    this.id = id;
    this.ownedBy = ownedBy;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastActive = lastActive;
  }

  getId(): string {
    return this.id;
  }

  getOwnedBy(): string {
    return this.ownedBy;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getLastActive(): Date {
    return this.lastActive;
  }

  isOwnedBy(id: string): boolean {
    return id === this.ownedBy;
  }

  getOwnedStatement(id: string): string {
    return this.isOwnedBy(id) ? 'Owned by you' : 'Owned by ' + this.ownedBy;
  }

  isActive(): boolean {
    return new Date(Date.now()).getTime() <= this.lastActive.getTime() + 14400000;
  }
}
