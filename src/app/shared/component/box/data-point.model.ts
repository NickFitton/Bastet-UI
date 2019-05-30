export class DataPointModel {
  readonly value: Date;
  public y: number;
  public x: number;

  constructor(value: Date) {
    this.value = value;
    this.y = 1;
  }

  public getValue(): Date {
    return this.value;
  }
  public getY(): number {
    return this.y;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getNiceTime(): string {
    const time = this.value;
    time.setMinutes(0);
    time.setSeconds(0);
    return time.toLocaleString();
  }

  public increment() {
    this.y = this.y + 1;
  }

  yearMatch(time: Date): boolean {
    return time.getUTCFullYear() === this.value.getUTCFullYear();
  }

  monthMatch(time: Date): boolean {
    return this.yearMatch(time) && time.getUTCMonth() === this.value.getUTCMonth();
  }

  dayMatch(time: Date): boolean {
    return this.monthMatch(time) && time.getUTCDate() === this.value.getUTCDate();
  }

  hoursMatch(time: Date): boolean {
    return this.dayMatch(time) && time.getUTCHours() === this.value.getUTCHours();
  }

  minutesMatch(time: Date): boolean {
    return this.hoursMatch(time) && time.getUTCMinutes() === this.value.getUTCMinutes();
  }

  secondsMatch(time: Date): boolean {
    return this.minutesMatch(time) && time.getUTCSeconds() === this.value.getUTCSeconds();
  }

}
