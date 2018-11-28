import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from '../../shared/api/metadata';
import { BarModel } from './bar.model';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chartjsbar-graph-component',
  templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit {

  chartType: string;
  chart: Chart;

  constructor() {
    this.chartType = 'bar';
  }

  @Input()
  set dataPoints(metadataObservable: Observable<Metadata[]>) {
    if (metadataObservable !== undefined) {
      metadataObservable.subscribe(allData => {
        console.log(`Plotting ${allData.length} points`);
        this.setDataPoints(allData);
      });
    } else {
      console.warn('Graph was given undefined observable');
    }
  }

  @Input()
  set graphType(type: string) {
    if (type !== undefined) {
      this.chartType = type;
      if (this.chart !== undefined) {
        this.chart.config.type = type;
        this.chart.update();
      }
    }
  }

  static sortBars(models: BarModel[]): BarModel[] {
    return models.sort((a, b) => {
      if (a.time.toISOString() < b.time.toISOString()) {
        return -1;
      }
      return 1;
    });
  }

  static matchingBar(bars: BarModel[], time: Date) {
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].hoursMatch(time)) {
        return i;
      }
    }
    return -1;
  }

  static plotByHour(data: Metadata[]): BarModel[] {
    const bars: BarModel[] = [];
    for (const meta of data) {
      const matching = BarComponent.matchingBar(bars, meta.imageTime);
      if (matching !== -1) {
        bars[matching].add(1);
      } else {
        bars.push(new BarModel(meta.imageTime, 1));
      }
    }
    return bars;
  }

  static writeLabels(bars: BarModel[]): string[] {
    let sameYear = true;
    let sameDay = true;

    const firstYear = bars[0].time.getUTCFullYear();
    const firstDay = bars[0].time.getUTCDate();

    for (const bar of bars) {
      if (sameYear && firstYear !== bar.time.getUTCFullYear()) {
        sameYear = false;
      }
      if (sameDay && firstDay !== bar.time.getUTCDate()) {
        sameDay = false;
      }
      if (!sameYear && !sameDay) {
        return bars.map(aBar => `${aBar.time.toLocaleDateString()} - ${aBar.time.getUTCHours()}:00`);
      }
    }

    if (sameDay) {
      return bars.map(bar => `${bar.time.getUTCHours()}:00`);
    } else if (sameYear) {
      return bars.map(bar => `${bar.time.getUTCMonth()}/${bar.time.getUTCDate()} - ${bar.time.getUTCHours()}:00`);
    }
  }

  ngOnInit() {
  }

  setDataPoints(metadata: Metadata[]) {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }

    let bars: BarModel[] = BarComponent.plotByHour(metadata);

    bars = BarComponent.sortBars(bars);

    let data: number[] = [];

    const labels = BarComponent.writeLabels(bars);
    if (bars.length > 0) {
      data = bars.map(bar => bar.count);
    }


    this.chart = new Chart(
      'canvas',
      {
        type: this.chartType,
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              borderWidth: 1,
              borderColor: '#ff0000',
              backgroundColor: '#ff7d7d',
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    this.chart.update(1);
  }
}
