import { Component, Input, OnInit } from '@angular/core';
import { GraphModel } from './graph.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input()
  data: GraphModel;

  constructor() { }

  ngOnInit() {
  }

}
