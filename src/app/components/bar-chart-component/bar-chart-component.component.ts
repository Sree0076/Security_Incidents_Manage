/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartServiceService } from '../../services/chart/chart.service.service';
import { isPlatformBrowser } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-chart-component',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './bar-chart-component.component.html',
  styleUrls: ['./bar-chart-component.component.css'],
})
export class BarChartComponentComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;

  constructor(
    private chartDataService: ChartServiceService,
    private router : Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // Register the plugin and other chart.js modules
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit() {
    if(this.router.url.includes('admin'))
    {
      this.loadChartData();
    }
  }

  // Load chart data from the service
  private loadChartData() {
    this.chartDataService.getChartData().subscribe((chartData) => {
      this.data = this.transformChartData(chartData);
      if (isPlatformBrowser(this.platformId)) {
        this.setupChartOptions();
      }
    });
  }

  private transformChartData(chartData: any) {
    return {
      labels: chartData.labels,
      datasets: chartData.datasets.map((dataset: any, index: number) => ({
        ...dataset,
        backgroundColor: this.getGradient.bind(this, index),
      })),
    };
  }

  // Setup chart options
  private setupChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      layout: {
        padding: {
          left: 0,
        },
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#000',
          bodyColor: '#000',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 14,
          bodySpacing: 6,
          titleFont: {
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            size: 14,
          },
          callbacks: {
            title: (tooltipItems: any) => {
              return tooltipItems[0].label;
            },
            label: (context: any) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
          },
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
          color: textColorSecondary,
          font: {
            weight: 'bold',
            size: 16,
          },
          formatter: (value: number) => {
            return value === 0 ? null : value;
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: ' Years ',
            color: textColorSecondary,
            font: {
              size: 14,
              weight: 'bold',
            },
          },
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          title: {
            display: true,
            text: ' No: of Incidents ',
            color: textColorSecondary,
            font: {
              size: 14,
              weight: 'bold',
            },
          },
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  private getGradient(index: number, context: any) {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) {
      return null;
    }
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );

    switch (index) {
      case 0:
        gradient.addColorStop(0, '#FF6F61');
        gradient.addColorStop(1, '#FF6F61');
        break;
      case 1:
        gradient.addColorStop(0, ' #188eb3');
        gradient.addColorStop(1, ' #188eb3');
        break;
      case 2:
        gradient.addColorStop(0, '#4DB6AC');
        gradient.addColorStop(1, '#4DB6AC');
        break;
    }

    return gradient;
  }
}
