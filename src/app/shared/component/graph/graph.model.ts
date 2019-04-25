export class GraphModel {
  title: string;
  type: string;
  data: any[][];
  hashData: any;
  columnNames: string[];
  options: any;
  width: number | string;
  height: number | string;

  constructor(title: string, type: string, columnNames: string[], options: any, width: number | string, height: number | string) {
    this.title = title;
    this.type = type;
    this.hashData = GraphModel.generateBlankHashData();
    this.data = GraphModel.hashDataToColumnData(this.hashData);
    this.columnNames = columnNames;
    this.options = options;
    this.width = width;
    this.height = height;
  }

  static getHourPointers(): string[] {
    const hours = [];
    for (let i = 0; i < 10; i++) {
      hours.push('0' + i + ':00');
    }
    for (let i = 10; i < 24; i++) {
      hours.push(i + ':00');
    }
    return hours;
  }

  static generateBlankHashData(): any {
    const tempData = {};
    for (const hour of GraphModel.getHourPointers()) {
      tempData[hour] = [];
    }
    return tempData;
  }

  static hashDataToColumnData(hashData: any): any[][] {
    const tempColumnData = [];

    for (const pointer of GraphModel.getHourPointers()) {
      const column = [];
      const hashDatum = hashData[pointer];
      column.push(pointer);
      for (const element of hashDatum) {
        column.push(element);
      }
      tempColumnData.push(column);
    }
    return tempColumnData;
  }
}
