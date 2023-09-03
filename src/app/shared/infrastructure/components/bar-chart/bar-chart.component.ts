/* eslint-disable no-magic-numbers */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartData } from '@shared/domain/ChartData.interface';

@Component({
	selector: 'challenger-bar-chart',
	standalone: true,
	imports: [CommonModule, NgxChartsModule],
	templateUrl: './bar-chart.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
	@Input() view: [number, number] = [100, 100];
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
