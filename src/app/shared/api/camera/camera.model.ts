export class CameraModel {
  private readonly id: string;
  private readonly ownedBy: string;
  private readonly name: string;
  private readonly createdAt: Date;
  private readonly lastActive: Date;

  constructor(
    id: string,
    ownedBy: string,
    name: string,
    createdAt: Date,
    lastActive: Date) {
    this.id = id;
    this.ownedBy = ownedBy;
    this.name = name;
    this.createdAt = createdAt;
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

  getLastActive(): Date {
    return this.lastActive;
  }

  isOwnedBy(id: string): string {
    return id === this.ownedBy;
  }

  getOwnedStatement(id: string): string {
    return this.isOwnedBy(id) ? 'Owned by you' : 'Owned by ' + this.ownedBy;
  }
}
