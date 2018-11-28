import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Metadata } from './metadata';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {

  readonly registerUrl = `http://localhost:8080`;

  constructor(private http: HttpClient) {
  }

  getMetadataCustomRange(startDate: Date, endDate: Date): Observable<Metadata[]> {
    return this.http.get<MetadataModel[]>(`${this.registerUrl}/image?from=${startDate.toISOString()}&to=${endDate.toISOString()}`)
      .pipe(map(metadataList => metadataList.map(metadataModel => new Metadata(metadataModel))));
  }

  getImage(imageId: string): Observable<Blob> {
    return this.http.get(`${this.registerUrl}/image/${imageId}/image`, {responseType: 'blob'});
  }
}
