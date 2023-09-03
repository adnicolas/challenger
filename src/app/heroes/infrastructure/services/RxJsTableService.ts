import { Injectable } from '@angular/core';
import { TableColumn } from '@shared/domain/TableColumn.interface';
import { TableService } from '@heroes/domain/TableService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RxJsTableService implements TableService {
	private tableColumnsSrc: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
		TableColumn[]
	>([]);
	public tableColumns$: Observable<TableColumn[]> =
		this.tableColumnsSrc.asObservable();

	public setTableColumns(columns: TableColumn[]): void {
		this.tableColumnsSrc.next(columns);
	}
}
