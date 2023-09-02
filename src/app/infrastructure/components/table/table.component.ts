import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SubjectStateService } from '@infrastructure/services/SubjectStateService';
import { SortHeroes } from '@application/SortHeroes';
import { OpenHeroDetail } from '@application/OpenHeroDetail';
// eslint-disable-next-line max-len
import { AngularMaterialHeroDetailDialogService } from '@infrastructure/services/AngularMaterialHeroDetailDialogService';
import { StateService } from '@domain/StateService';
import { HeroDetailDialogService } from '@domain/HeroDetailDialogService';

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
	providers: [
		{ provide: StateService, useClass: SubjectStateService },
		{
			provide: HeroDetailDialogService,
			useClass: AngularMaterialHeroDetailDialogService
		}
	],
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
	private stateService = inject(SubjectStateService);
	public heroes$: Observable<MarvelHero[]> = this.stateService.mutableHeroes$;
	private heroes: MarvelHero[] = [];
	public displayedColumns: string[] = [];

	constructor(private heroDetailDialogService: HeroDetailDialogService) {
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

	public selectRow(hero: MarvelHero): void {
		new OpenHeroDetail(this.heroDetailDialogService).run(hero);
	}
}
