import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==')
      .pipe(
        map(entries => {
          console.log('Entries:', entries);
          const employeeMap = new Map();
          entries.forEach(entry => {
            const employeeName = entry.EmployeeName;
            const totalTimeWorked = new Date(entry.EndTimeUtc).getTime() - new Date(entry.StarTimeUtc).getTime();
            if (employeeMap.has(employeeName)) {
              employeeMap.set(employeeName, employeeMap.get(employeeName) + totalTimeWorked);
            } else {
              employeeMap.set(employeeName, totalTimeWorked);
            }
          });
          return Array.from(employeeMap, ([employeeName, totalTime]) => ({ employeeName, totalTimeWorked: totalTime / (1000 * 60 * 60) }));
        })
      );
  }
}
