/* eslint-disable no-magic-numbers */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartDataValue } from '@shared/domain/ChartDataValue.interface';

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
	@Input() data: ChartDataValue[] = [];
}
