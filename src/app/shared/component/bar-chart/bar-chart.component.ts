import { Component, Input } from '@angular/core';
import { DataPointModel } from '../box/data-point.model';
import { DataOrderModel } from '../box/data-order.model';
import { DateEnum } from './date.enum';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.styl']
})
export class BarChartComponent {

  public yLabelCount = 5;
  public yLabelRange = Array.from({length: this.yLabelCount + 1}, (value, key) => key);
  public svgWidth = 800;
  public svgHeight = 450;
  public padding = {
    top: 10,
    bottom: 40,
    left: 35,
    right: 5
  };
  public chartWidth = this.svgWidth - (this.padding.left + this.padding.right);
  public chartHeight = this.svgHeight - (this.padding.top + this.padding.bottom);
  public barWidth = this.chartWidth;
  public givenValues: DataPointModel[];
  public maxVal: number;
  public minVal: number;
  public barPadding = 3;

  // @Input()
  public readonly sortBy: DataOrderModel;

  @Input()
  public format: DateEnum;

  @Input()
  set values(points: DataPointModel[]) {
    if (points != null && points !== undefined) {
      this.givenValues = points;
      this.maxVal = BarChartComponent.maxmin(points.map(val => val.getY()))[0];

      this.updateBarWidth();
      this.givenValues = this.sortPoints();
      for (let i = 0; i < this.givenValues.length; i++) {
        this.givenValues[i].setX(this.formatX(this.givenValues[i]));
        this.givenValues[i].setY(this.chartHeight * (this.givenValues[i].getY() / this.maxVal));
      }
    }
  }

  formatX(point: DataPointModel) {
    switch (this.format) {
      default:
      case DateEnum.DAY:
        return (point.value.getHours() / 24) * this.chartWidth;
      case DateEnum.WEEK:
      case DateEnum.FORTNIGHT:
        return (point.value.getDay() / 7) * this.chartWidth;
      case DateEnum.MONTH:
      case DateEnum.QUATER:
        return (point.value.getDay() / 31) * this.chartWidth;
      case DateEnum.YEAR:
        return (point.value.getMonth() / 12) * this.chartWidth;
    }
  }

  static maxmin(numbers: number[]): number[] {
    if (numbers.length > 0) {
      let max = numbers[0];
      let min = numbers[0];

      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
          max = numbers[i];
        }
        if (numbers[i] < min) {
          min = numbers[i];
        }
      }
      return [max, min];
    }
  }

  updateBarWidth(): void {
    this.barWidth = Math.min(this.chartWidth / 24);
  }

  constructor() {
    this.givenValues = [];
    this.sortBy = DataOrderModel.DEFAULT;
  }

  sortPoints(): DataPointModel[] {
    return this.givenValues.sort((a, b) => {
      switch (this.sortBy) {
        case DataOrderModel.DEFAULT:
        default:
          return 0;
        case DataOrderModel.ASC:
          return a.getX() - b.getX();
      }
    });
  }

  calcGroupY(x: number) {
    return this.svgHeight - this.padding.bottom - ((this.chartHeight / this.yLabelCount) * x);
  }

  calcGroupX(x: number) {
    switch (this.format) {
      default:
      case DateEnum.DAY:
        return this.padding.left + ((this.chartWidth / 24) * x);
      case DateEnum.WEEK:
      case DateEnum.FORTNIGHT:
        return this.padding.left + ((this.chartWidth / 7) * x);
      case DateEnum.MONTH:
      case DateEnum.QUATER:
        return this.padding.left + ((this.chartWidth / 31) * x);
      case DateEnum.YEAR:
        return this.padding.left + ((this.chartWidth / 12) * x);
    }
  }

  yLabel(x: number) {
    // return (this.maxVal * (x / (this.yLabelRange.length - 1))).toPrecision(2);
    return Math.round(this.maxVal * (x / (this.yLabelRange.length - 1)));
  }
}
