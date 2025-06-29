import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { resource } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, NgChartsModule],
  template: `
    <h2>User Dashboard</h2>

    <div class="gif-loader-wrapper" *ngIf="usersResource.isLoading()"><img src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" class="gif-loader" alt="Loading..."></div>
    <div *ngIf="usersResource.error()">Error: {{ usersResource.error() }}</div>
    <button *ngIf="usersResource.value()" (click)="exportAllStatsCSV()">⬇️ Export All Stats</button>
    <div *ngIf="usersResource.value()" class="dashboard-grid">

  <div class="chart-box">
    <h3>📍 City Distribution</h3>
    <button (click)="downloadChartCSV('City', cityChart)">⬇️ Export</button>
    <canvas baseChart [data]="cityChart" [type]="'doughnut'" [options]="chartOptions"></canvas>
  </div>

  <div class="chart-box">
    <h3>🎂 Age Distribution</h3>
    <button (click)="downloadChartCSV('Age', ageChart)">⬇️ Export</button>
    <canvas baseChart [data]="ageChart" [type]="'bar'" [options]="chartOptions"></canvas>
  </div>

  <div class="chart-box">
    <h3>👤 Gender Distribution</h3>
    <button (click)="downloadChartCSV('Gender', genderChart)">⬇️ Export</button>
    <canvas baseChart [data]="genderChart" [type]="'pie'" [options]="chartOptions"></canvas>
  </div>

  <div class="chart-box">
    <h3>👁️ Eye Color Distribution</h3>
    <button (click)="downloadChartCSV('EyeColor', eyeColorChart)">⬇️ Export</button>
    <canvas baseChart [data]="eyeColorChart" [type]="'doughnut'" [options]="chartOptions"></canvas>
  </div>
</div>

  `
})
export class DashboardComponent {
  private http = inject(HttpClient);

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // plugins: {
    //   legend: { position: 'top' },
    //   title: { display: true, text: 'User Stats' }
    // }
  };

  cityChart: ChartData<'doughnut', number[], string> = { labels: [], datasets: [{ data: [], label: 'Users per City' }] };
  ageChart: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ data: [], label: 'Users by Age Range' }]
  };
  genderChart: ChartData<'pie', number[], string> = { labels: [], datasets: [{ data: [], label: 'Users by Gender' }] };
  eyeColorChart: ChartData<'doughnut', number[], string> = { labels: [], datasets: [{ data: [], label: 'Users by Eye Color' }] };

  usersResource = resource({
    loader: async () => {
      const response = await lastValueFrom(this.http.get<any>('https://dummyjson.com/users?limit=100'));
      const users = response.users;

      const cityCounts: Record<string, number> = {};
      const ageGroups: Record<string, number> = {
        '18–25': 0,
        '26–35': 0,
        '36–45': 0,
        '46–60': 0,
        '60+': 0
      };

      const genderCounts: Record<string, number> = {};
      const eyeColorCounts: Record<string, number> = {};

      for (const user of users) {
        const city = user.address?.city || 'Unknown';
        const age = user.age || 0;
        const gender = user.gender || 'Unknown';
        const eyeColor = user.eyeColor || 'Unknown';

        cityCounts[city] = (cityCounts[city] || 0) + 1;
        if (age >= 18 && age <= 25) ageGroups['18–25']++;
else if (age >= 26 && age <= 35) ageGroups['26–35']++;
else if (age >= 36 && age <= 45) ageGroups['36–45']++;
else if (age >= 46 && age <= 60) ageGroups['46–60']++;
else if (age > 60) ageGroups['60+']++;
        genderCounts[gender] = (genderCounts[gender] || 0) + 1;
        eyeColorCounts[eyeColor] = (eyeColorCounts[eyeColor] || 0) + 1;
      }

      this.cityChart = {
        labels: Object.keys(cityCounts),
        datasets: [{ data: Object.values(cityCounts), label: 'Users per City' }]
      };

      this.ageChart = {
        labels: Object.keys(ageGroups),
        datasets: [{ data: Object.values(ageGroups), label: 'Users by Age Range' }]
      };

      this.genderChart = {
        labels: Object.keys(genderCounts),
        datasets: [{ data: Object.values(genderCounts), label: 'Users by Gender' }]
      };

      this.eyeColorChart = {
        labels: Object.keys(eyeColorCounts),
        datasets: [{ data: Object.values(eyeColorCounts), label: 'Users by Eye Color' }]
      };

      return users;
    }
  });


  exportAllStatsCSV() {
    const rows: string[][] = [['Category', 'Label', 'Count']];

    const extract = (category: string, chart: ChartData<any, number[], any>) => {
      const labels = chart.labels || [];
      const data = chart.datasets[0].data;
      labels.forEach((label: any, i: number) => {
        rows.push([category, label.toString(), data[i].toString()]);
      });
    };

    extract('City', this.cityChart);
    extract('Age', this.ageChart);
    extract('Gender', this.genderChart);
    extract('EyeColor', this.eyeColorChart);

    const csvContent = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user_statistics.csv';
    link.click();
  }

  downloadChartCSV(category: string, chart: ChartData<any, number[], any>) {
    const labels = chart.labels ?? [];
    const data = chart.datasets[0].data;

    const rows: string[][] = [['Label', 'Count']];
    labels.forEach((label: any, i: number) => {
      rows.push([label.toString(), data[i].toString()]);
    });

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${category.toLowerCase()}_distribution.csv`;
    link.click();
  }
}
