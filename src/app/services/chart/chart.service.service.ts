import { Injectable } from '@angular/core';
import { IncidentSharedService } from '../shared/incident/incident.shared.service';
import { map, Observable } from 'rxjs';
import { Incidents } from '../../models/incident-interface';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private incidentDataService: IncidentSharedService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getChartData(): Observable<any> {
    return this.incidentDataService.incidentData.pipe(
      map((data: Incidents | null) => {
        if (data && data.yearlyIncidentCounts) {
          const yearlyIncidentCounts = data.yearlyIncidentCounts;
          const years = Object.keys(yearlyIncidentCounts);
          const incidentTypes: (keyof typeof yearlyIncidentCounts[string])[] = [
            "Privacy Incidents",  
            "Security Incidents",
            "Quality Incidents"
          ];

          const datasets = incidentTypes.map((type) => {
            return {
              label: type,
              data: years.map((year) => yearlyIncidentCounts[year]?.[type] || 0),
            };
          });

          return {
            labels: years,
            datasets: datasets,
          };
        } else {
          return { labels: [], datasets: [] };
        }
      })
    );
  }
}
