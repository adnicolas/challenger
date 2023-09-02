import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SubjectStateService } from '@infrastructure/services/SubjectStateService';
import { SortHeroes } from '@application/SortHeroes';

const headerCapitalizeSlice = 1;

@Component({
	selector: 'challenger-table',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule
	],
	templateUrl: './table.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
	private stateService = inject(SubjectStateService);
	public heroes$: Observable<MarvelHero[]> = this.stateService.mutableHeroes$;
	private heroes: MarvelHero[] = [];
	public displayedColumns: string[] = [];

	constructor() {
		this.heroes$.subscribe((heroes: MarvelHero[]) => {
			this.heroes = heroes;
			if (heroes?.length) {
				this.displayedColumns = Object.keys(heroes[0]);
			}
		});
	}

	public getHeader(property: string): string {
		if (property.includes('Label')) {
			return `${property[0].toUpperCase()}${property.slice(
				headerCapitalizeSlice,
			)}`.replace('Label', '');
		}
		return property;
	}

	public sortData(sort: Sort): void {
		new SortHeroes(this.stateService).run(
			{
				property: sort.active,
				direction: sort.direction
			},
			this.heroes,
		);
	}
}
