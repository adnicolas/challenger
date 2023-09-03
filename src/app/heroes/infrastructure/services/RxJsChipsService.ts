import { Injectable } from '@angular/core';
import { ChipsService } from '@heroes/domain/ChipsService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RxJsChipsService implements ChipsService {
	private optionsSrc: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
		[],
	);
	public options$: Observable<string[]> = this.optionsSrc.asObservable();
	constructor() {}
	public setOptions(options: string[]): void {
		this.optionsSrc.next(options);
	}
}
