import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { Observable } from 'rxjs';
import { TableColumn } from '@shared/domain/TableColumn.interface';

export abstract class TableService {
	public abstract tableColumns$: Observable<TableColumn[]>;
	public abstract setTableColumns(heroes: MarvelHero[]): void;
}
