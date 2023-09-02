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
import { MatSortModule } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SubjectStateService } from '@infrastructure/services/SubjectStateService';

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

	constructor(private dataService: DataService) {
		this.heroes$.subscribe((data: MarvelHero[]) => {
			if (data?.length) {
				this.displayedColumns = Object.keys(data[0]);
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

	public sortData(): void {}
}
