export class BarModel {
  time: Date;
  count: number;

  constructor(time: Date, count: number) {
    this.time = time;
    this.count = count;
  }

  add(count: number): void {
    this.count += count;
  }

  yearMatch(time: Date): boolean {
    return time.getUTCFullYear() === this.time.getUTCFullYear();
  }

  monthMatch(time: Date): boolean {
    return this.yearMatch(time) && time.getUTCMonth() === this.time.getUTCMonth();
  }

  dayMatch(time: Date): boolean {
    return this.monthMatch(time) && time.getUTCDate() === this.time.getUTCDate();
  }

  hoursMatch(time: Date): boolean {
    return this.dayMatch(time) && time.getUTCHours() === this.time.getUTCHours();
    // return time.getUTCHours() === this.time.getUTCHours();
  }

  minutesMatch(time: Date): boolean {
    return this.hoursMatch(time) && time.getUTCMinutes() === this.time.getUTCMinutes();
  }

  secondsMatch(time: Date): boolean {
    return this.minutesMatch(time) && time.getUTCSeconds() === this.time.getUTCSeconds();
  }
}
