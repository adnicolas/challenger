import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'challenger-chips',
	standalone: true,
	imports: [
		CommonModule,
		MatChipsModule,
		MatIconModule,
		MatInputModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './chips.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ChipsComponent {
	public separatorKeysCodes: number[] = [ENTER, COMMA];
	public optionCtrl = new FormControl('');
	public filteredOptions: Observable<string[]> = of([]);
	public options: string[] = ['Lemon'];
	private allOptions: string[] = [
		'Apple',
		'Lemon',
		'Lime',
		'Orange',
		'Strawberry'
	];

	@ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;

	constructor() {
		this.filteredOptions = this.optionCtrl.valueChanges.pipe(
			startWith(null),
			map((option: string | null) =>
				option ? this._filter(option) : this.allOptions.slice(),
			),
		);
	}
	public add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
			this.options.push(value);
		}
		event.chipInput!.clear();
		this.optionCtrl.setValue(null);
	}

	public remove(option: string): void {
		const index = this.options.indexOf(option);

		// eslint-disable-next-line no-magic-numbers
		if (index >= 0) {
			// eslint-disable-next-line no-magic-numbers
			this.options.splice(index, 1);
		}
	}

	public selected(event: MatAutocompleteSelectedEvent): void {
		this.options.push(event.option.viewValue);
		this.optionInput.nativeElement.value = '';
		this.optionCtrl.setValue(null);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allOptions.filter((option) =>
			option.toLowerCase().includes(filterValue),
		);
	}
}
