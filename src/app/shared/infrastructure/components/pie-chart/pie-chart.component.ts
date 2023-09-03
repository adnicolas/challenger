/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, scaleOrdinal, pie, arc } from 'd3';

@Component({
	selector: 'challenger-pie-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pie-chart.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnInit {
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
	@Input() scaleProperty: string = 'Stars';
	@Input() textProperty: string = 'Framework';

	private radius = Math.min(this.width, this.height) / 2 - this.margin;
	private colors: any;
	private svg: any;

	ngOnInit(): void {
		this.createSvg();
		this.createColors();
		this.drawChart();
	}
	private createSvg(): void {
		this.svg = select('figure#pie')
			.append('svg')
			.attr('width', this.width)
			.attr('height', this.height)
			.append('g')
			.attr('transform', `translate(${this.width / 2},${this.height / 2})`);
	}

	private createColors(): void {
		this.colors = scaleOrdinal()
			.domain(this.data.map((d: any) => d[this.scaleProperty].toString()))
			.range([
				'#c7d3ec',
				'#a5b8db',
				'#879cc4',
				'#677795',
				'#5a6782'
			]);
	}

	private drawChart(): void {
		const d3pie = pie<any>().value((d: any) => Number(d[this.scaleProperty]));

		this.svg
			.selectAll('pieces')
			.data(d3pie(this.data))
			.enter()
			.append('path')
			.attr('d', arc().innerRadius(0)
				.outerRadius(this.radius))
			.attr('fill', (d: any, i: any) => this.colors(i))
			.attr('stroke', '#121926')
			.style('stroke-width', '1px');

		const labelLocation = arc().innerRadius(100)
			.outerRadius(this.radius);

		this.svg
			.selectAll('pieces')
			.data(d3pie(this.data))
			.enter()
			.append('text')
			.text((d: any) => d.data[this.textProperty])
			.attr('transform', (d: any) => `translate(${labelLocation.centroid(d)})`)
			.style('text-anchor', 'middle')
			.style('font-size', 15);
	}
}
