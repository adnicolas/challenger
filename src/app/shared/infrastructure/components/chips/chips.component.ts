import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, of } from 'rxjs';
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
	styleUrls: ['./chips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsComponent implements OnInit, OnDestroy {
	@Input() placeholder!: string;
	@Input() allOptions$: Observable<string[]> = of([]);

	@Output() updated: EventEmitter<string[]> = new EventEmitter<string[]>();
	@Output() resetted: EventEmitter<void> = new EventEmitter<void>();

	public separatorKeysCodes: number[] = [ENTER, COMMA];
	public optionCtrl = new FormControl('');
	public filteredOptions: Observable<string[]> = of([]);
	public allOptions: string[] = [];
	public options: string[] = [];
	private subscription!: Subscription;

	@ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;

	ngOnInit(): void {
		this.subscription = this.allOptions$.subscribe((options: string[]) => {
			this.allOptions = options;
			this.filteredOptions = this.optionCtrl.valueChanges.pipe(
				startWith(null),
				map((option: string | null) =>
					option ? this.filter(option) : this.allOptions.slice(),
				),
			);
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	public add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
			this.options.push(value);
		}
		event.chipInput.clear();
		this.optionCtrl.setValue(null);
		this.updated.emit(this.options);
	}

	public remove(option: string): void {
		const index = this.options.indexOf(option);
		// eslint-disable-next-line no-magic-numbers
		if (index >= 0) {
			// eslint-disable-next-line no-magic-numbers
			this.options.splice(index, 1);
		}
		if (this.options.length) {
			this.updated.emit(this.options);
		} else {
			this.resetted.emit();
		}
	}

	public selected(event: MatAutocompleteSelectedEvent): void {
		this.options.push(event.option.viewValue);
		this.optionInput.nativeElement.value = '';
		this.optionCtrl.setValue(null);
		this.updated.emit(this.options);
	}

	private filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allOptions.filter((option: string) =>
			option.toLowerCase().includes(filterValue),
		);
	}
}
