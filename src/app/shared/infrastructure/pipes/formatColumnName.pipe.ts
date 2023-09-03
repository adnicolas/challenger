import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatColumnName',
	standalone: true
})
export class FormatColumnName implements PipeTransform {
	transform(value: string): string {
		const withoutLabel: string = value.replace('Label', '');
		const [first, ...rest] = withoutLabel;
		return `${first.toUpperCase()}${rest.join('')}`;
	}
}
