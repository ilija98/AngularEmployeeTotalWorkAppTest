import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: any[] = [];
  pieChart: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.sort((a, b) => b.totalTimeWorked - a.totalTimeWorked);
      this.createPieChart();
    });
  }

  createPieChart(): void {
    const employeeNames = this.employees.map(employee => employee.employeeName);
    const totalTimeWorked = this.employees.map(employee => employee.totalTimeWorked);

    const ctx = document.getElementById('pieChartCanvas') as HTMLCanvasElement;
   // ctx.width = 900; 
    //ctx.height = 900; 
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        /*labels: employeeNames,
        datasets: [{
          data: totalTimeWorked,
          backgroundColor: this.getRandomColors(totalTimeWorked.length)*/
          labels: this.employees.map(employee => employee.employeeName), 
          datasets: [{
          data: this.employees.map(employee => employee.totalTimeWorked), 
          backgroundColor: this.getRandomColors(this.employees.length) 
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          } ,        
        
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || '';
              /*if (label) {
                label += ': ';
              }
              if (context.parsed) {
                label += context.parsed.toFixed(2) + '%'; 
              }*/
              const value = context.formattedValue;
              const total = context.dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
              const percentage = Math.round((Number(value) / total) * 100);
              return `${label} ${value} hours (${percentage}%)`;
            }
          }
        },
        
    }
  }
    });
  }

 
  getRandomColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      colors.push(color);
    }
    return colors;
  }


  roundHours(totalTime: number): number {
    return Math.round(totalTime);
  }
}

