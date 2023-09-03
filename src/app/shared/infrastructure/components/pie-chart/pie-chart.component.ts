/* eslint-disable no-magic-numbers */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartData } from '@shared/domain/ChartData.interface';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
	selector: 'challenger-pie-chart',
	standalone: true,
	imports: [CommonModule, NgxChartsModule],
	templateUrl: './pie-chart.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
	public view: [number, number] = [100, 100];
	@Input() data: ChartData[] = [
		{
			name: 'Germany',
			value: 8940000
		},
		{
			name: 'USA',
			value: 5000000
		},
		{
			name: 'France',
			value: 7200000
		},
		{
			name: 'UK',
			value: 6200000
		}
	];
}
