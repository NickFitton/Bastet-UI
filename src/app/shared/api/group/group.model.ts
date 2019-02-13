export class GroupModel {
  private readonly id: string;
  private readonly name: string;
  private readonly ownedBy: string;
  private readonly members: string[];
  private readonly cameras: string[];

  constructor(
    id: string,
    name: string,
    ownedBy: string,
    members: string[],
    cameras: string[]) {
    this.id = id;
    this.name = name;
    this.ownedBy = ownedBy;
    this.members = members;
    this.cameras = cameras;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAdmin(): string {
    return this.ownedBy;
  }

  getMembers(): string[] {
    // return this.members === null ? [] : this.members;
    if (this.members === undefined) {
      return [];
    }
    return this.members;
    // return [];
  }

  getCameras(): string[] {
    // return this.cameras === null ?  [] : this.cameras;
    if (this.cameras === undefined) {
      return [];
    }
    return this.cameras;
    // return [];
  }
}
