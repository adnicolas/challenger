/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, scaleBand, axisBottom, axisLeft, scaleLinear } from 'd3';

@Component({
	selector: 'challenger-bar-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './bar-chart.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements OnInit {
	@Input() data: any[] = [
		{ Framework: 'Vue', Stars: '166443', Released: '2014' },
		{ Framework: 'React', Stars: '150793', Released: '2013' },
		{ Framework: 'Angular', Stars: '62342', Released: '2016' },
		{ Framework: 'Backbone', Stars: '27647', Released: '2010' },
		{ Framework: 'Ember', Stars: '21471', Released: '2011' }
	];
	@Input() margin = 50;
	@Input() width = 750;
	@Input() height = 600;
	@Input() yProperty: string = 'Stars';
	@Input() xProperty: string = 'Framework';

	private svg: any;

	ngOnInit(): void {
		this.createSvg();
		this.drawBars(this.data);
	}

	private createSvg(): void {
		this.svg = select('figure#bar')
			.append('svg')
			.attr('width', this.width + this.margin * 2)
			.attr('height', this.height + this.margin * 2)
			.append('g')
			.attr('transform', `translate(${this.margin},${this.margin})`);
	}

	// eslint-disable-next-line max-lines-per-function
	private drawBars(data: any[]): void {
		const x = scaleBand()
			.range([0, this.width])
			.domain(data.map((d) => d.xProperty))
			.padding(0.2);

		this.svg
			.append('g')
			.attr('transform', `translate(0,${this.height})`)
			.call(axisBottom(x))
			.selectAll('text')
			.attr('transform', 'translate(-10,0)rotate(-45)')
			.style('text-anchor', 'end');

		const y = scaleLinear().domain([0, 200000])
			.range([this.height, 0]);

		this.svg.append('g').call(axisLeft(y));

		this.svg
			.selectAll('bars')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d: any) => x(d.xProperty))
			.attr('y', (d: any) => y(d.yProperty))
			.attr('width', x.bandwidth())
			.attr('height', (d: any) => this.height - y(d[this.yProperty]))
			.attr('fill', '#d04a35');
	}
}
