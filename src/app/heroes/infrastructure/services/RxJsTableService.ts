import { Injectable } from '@angular/core';
import { TableService } from '@heroes/domain/TableService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RxJsTableService implements TableService {
	private tableColumnsNamesSrc: BehaviorSubject<string[]> = new BehaviorSubject<
		string[]
	>([]);
	public tableColumnsNames$: Observable<string[]> =
		this.tableColumnsNamesSrc.asObservable();

	public setTableColumnsNames(columns: string[]): void {
		this.tableColumnsNamesSrc.next(columns);
	}
}
