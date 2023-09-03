/* eslint-disable no-magic-numbers */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartDataValue } from '@shared/domain/ChartDataValue.interface';
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
	@Input() view: [number, number] = [100, 100];
	@Input() data: ChartDataValue[] = [];
}
