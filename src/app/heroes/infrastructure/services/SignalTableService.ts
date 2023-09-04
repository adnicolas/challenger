import { Injectable, WritableSignal, Signal, signal } from '@angular/core';
import { TableService } from '@heroes/domain/TableService';

@Injectable()
export class SignalTableService implements TableService {
	private tableColumnsNamesSrc: WritableSignal<string[]> = signal([]);
	public tableColumnsNames$: Signal<string[]> =
		this.tableColumnsNamesSrc.asReadonly();

	public setTableColumnsNames(columns: string[]): void {
		this.tableColumnsNamesSrc.set(columns);
	}
}
