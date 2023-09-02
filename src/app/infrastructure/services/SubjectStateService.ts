import { Injectable } from '@angular/core';
import { MarvelData } from '@domain/MarvelData.interface';
import { StateService } from '@domain/StateService.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SubjectStateService implements StateService {
	private dataSrc = new BehaviorSubject<MarvelData[]>([]);
	public data$: Observable<MarvelData[]> = this.dataSrc.asObservable();

	public setData(data: MarvelData[]): void {
		this.dataSrc.next(data);
	}
}
