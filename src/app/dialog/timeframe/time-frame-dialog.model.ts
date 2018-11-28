import { TimeFrameModel } from './time-frame.model';

export class TimeFrameDialogModel {
  public start: TimeFrameModel;
  public end: TimeFrameModel;
  public graphTypes: string[];
  public currentGraph: string;

  constructor(start: TimeFrameModel, end: TimeFrameModel, graphTypes: string[], currentGraph?: string) {
    this.start = start;
    this.end = end;
    this.graphTypes = graphTypes;
    if (currentGraph) {
      this.currentGraph = currentGraph;
    } else if (graphTypes.length > 0) {
      this.currentGraph = graphTypes[0].toLowerCase();
    }
  }

}
