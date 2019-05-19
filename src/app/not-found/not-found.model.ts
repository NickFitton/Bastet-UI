export class NotFoundModel {
  public readonly value: string;
  public readonly link: string;
  public readonly routable: boolean;

  constructor(value: string, link: string, routable: boolean) {
    this.value = value;
    this.link = link;
    this.routable = routable;
  }

  public getValue(): string {
    return this.value;
  }

  public getLink(): string {
    return this.link;
  }

  public isRoutable(): boolean {
    return this.routable;
  }
}
