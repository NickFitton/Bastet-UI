export class TimeFrameModel {
  public date: Date;
  public time: string;

  constructor(date: Date, time?: string) {
    this.update(date, time);
  }

  get dateTime(): Date {
    const tempDate = new Date(this.date);
    const timeParts = this.time.split(':');
    if (timeParts[0].length === 1) {
      tempDate.setHours(
        parseInt(`0${timeParts[0]}`, 10),
        parseInt(timeParts[1], 10),
        0,
        0);
      return tempDate;
    } else {
      tempDate.setHours(
        parseInt(timeParts[0], 10),
        parseInt(timeParts[1], 10),
        0,
        0);
      return tempDate;
    }
  }

  update(newDate: Date, time?: string) {
    this.date = new Date(newDate);
    this.date.setHours(0, 0, 0, 0);

    if (time) {
      this.time = time;
    } else {
      const tempTime = `${newDate.getUTCHours()}:${newDate.getUTCMinutes()}`;
      if (newDate.getUTCHours() > 9) {
        this.time = tempTime;
      } else {
        this.time = `0${tempTime}`;
      }
    }
  }
}
