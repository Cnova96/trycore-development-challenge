import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  input,
} from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { ActivityWithEvm } from '../../../../core/models/evm.model';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
);

@Component({
  selector: 'app-evm-chart',
  standalone: true,
  templateUrl: './evm-chart.component.html',
  styleUrl: './evm-chart.component.scss',
})
export class EvmChartComponent implements AfterViewInit, OnChanges {
  readonly activityMetrics = input.required<ActivityWithEvm[]>();

  @ViewChild('chartCanvas', { static: true })
  private chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activityMetrics'] && this.chart) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    const items = this.activityMetrics();

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: items.map((item) => item.activity.name),
        datasets: [
          {
            label: 'PV',
            data: items.map((item) => item.evm.pv),
            backgroundColor: '#64748b',
          },
          {
            label: 'EV',
            data: items.map((item) => item.evm.ev),
            backgroundColor: '#2563eb',
          },
          {
            label: 'AC',
            data: items.map((item) => item.evm.ac),
            backgroundColor: '#dc2626',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'PV, EV y AC por actividad',
          },
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valor ($)',
            },
          },
        },
      },
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}
