import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewChild,
	inject
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
import { SubjectStateService } from '@infrastructure/services/SubjectStateService';
import { FilterHeroes } from '@application/FilterHeroes';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { DomainHeroService } from '@domain/DomainHeroService';
import { ResetHeroes } from '@application/ResetHeroes';
import { SortHeroes } from '@application/SortHeroes';

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
	private stateService = inject(SubjectStateService);
	public heroes$: Observable<MarvelHero[]> = this.stateService.heroes$;
	public separatorKeysCodes: number[] = [ENTER, COMMA];
	public optionCtrl = new FormControl('');
	public filteredOptions: Observable<string[]> = of([]);
	public options: string[] = [];
	private allOptions: string[] = [];

	@ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;

	constructor(private domainHeroService: DomainHeroService) {
		this.heroes$.subscribe((heroes: MarvelHero[]) => {
			const heroesNames: string[] = heroes.map((hero: MarvelHero) =>
				this.domainHeroService.getHeroName(hero),
			);
			this.allOptions = heroesNames;
			this.filteredOptions = this.optionCtrl.valueChanges.pipe(
				startWith(null),
				map((option: string | null) =>
					option ? this.filter(option) : this.allOptions.slice(),
				),
			);
		});
	}
	public add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
			this.options.push(value);
		}
		event.chipInput!.clear();
		this.optionCtrl.setValue(null);
		new FilterHeroes(this.stateService, this.domainHeroService).run(
			this.options,
		);
	}

	public remove(option: string): void {
		const index = this.options.indexOf(option);
		// eslint-disable-next-line no-magic-numbers
		if (index >= 0) {
			// eslint-disable-next-line no-magic-numbers
			this.options.splice(index, 1);
		}
		if (this.options.length) {
			new FilterHeroes(this.stateService, this.domainHeroService).run(
				this.options,
			);
		} else {
			new ResetHeroes(this.stateService).run();
			new SortHeroes(this.stateService).run();
		}
	}

	public selected(event: MatAutocompleteSelectedEvent): void {
		this.options.push(event.option.viewValue);
		this.optionInput.nativeElement.value = '';
		this.optionCtrl.setValue(null);
		new FilterHeroes(this.stateService, this.domainHeroService).run(
			this.options,
		);
	}

	private filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allOptions.filter((option: string) =>
			option.toLowerCase().includes(filterValue),
		);
	}
}
