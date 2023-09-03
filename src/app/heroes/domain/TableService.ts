import { Observable } from 'rxjs';
import { TableColumn } from '@shared/domain/TableColumn.interface';

export abstract class TableService {
	public abstract tableColumns$: Observable<TableColumn[]>;
	public abstract setTableColumns(columns: TableColumn[]): void;
}
