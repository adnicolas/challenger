import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	effect,
	inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MarvelData } from '@domain/MarvelData.interface';
import { DataService } from '@domain/DataService';
import { LocalDataService } from '@infrastructure/services/LocalDataService';
import { BehaviorSubject } from 'rxjs';
import { GetData } from '@application/GetData';
import { SignalStateService } from '@infrastructure/services/SignalStateService';

const headerCapitalizeSlice = 1;

@Component({
	selector: 'challenger-table',
	standalone: true,
	imports: [CommonModule, MatTableModule],
	templateUrl: './table.component.html',
	styles: [],
	providers: [{ provide: DataService, useClass: LocalDataService }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private dataSrc = new BehaviorSubject<any>([]);
	public dataSource$ = this.dataSrc.asObservable();
	private displayedColumnsSrc = new BehaviorSubject<string[]>([]);
	public displayedColumns$ = this.displayedColumnsSrc.asObservable();

	private stateService = inject(SignalStateService);

	constructor(private dataService: DataService) {
		effect(() => {
			const data: MarvelData[] = this.stateService.data$();
			if (data?.length) {
				this.displayedColumnsSrc.next(Object.keys(data[0]));
				this.dataSrc.next(new MatTableDataSource(data));
			}
		});
	}

	async ngOnInit() {
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
}
