export class NotFoundModel {
  private readonly value: string;
  private readonly link: string;

  constructor(value: string, link: string) {
    this.value = value;
    this.link = link;
  }

  public getValue(): string {
    return this.value;
  }

  public getLink(): string {
    return this.link;
  }
}
