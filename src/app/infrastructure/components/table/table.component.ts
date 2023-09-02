import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { DataService } from '@domain/DataService';
import { LocalDataService } from '@infrastructure/services/LocalDataService';
import { GetData } from '@application/GetData';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SubjectStateService } from '@infrastructure/services/SubjectStateService';
import { SortData } from '@application/SortData';

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
	providers: [{ provide: DataService, useClass: LocalDataService }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewInit {
	private stateService = inject(SubjectStateService);
	public heroes$: Observable<MarvelHero[]> = this.stateService.data$;
	public displayedColumns: string[] = [];
	private heroes: MarvelHero[] = [];

	constructor(private dataService: DataService) {
		this.heroes$.subscribe((heroes: MarvelHero[]) => {
			this.heroes = heroes;
			if (heroes?.length) {
				this.displayedColumns = Object.keys(heroes[0]);
			}
		});
	}

	async ngAfterViewInit() {
		await new GetData(this.dataService, this.stateService).run();
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
		new SortData(this.stateService).run(
			this.heroes,
			sort.active,
			sort.direction,
		);
	}
}
