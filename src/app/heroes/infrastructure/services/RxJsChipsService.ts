import { Injectable } from '@angular/core';
import { ChipsService } from '@heroes/domain/ChipsService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RxJsChipsService implements ChipsService {
	private optionsSrc: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
		[],
	);
	public options$: Observable<string[]> = this.optionsSrc.asObservable();
	public setOptions(options: string[]): void {
		this.optionsSrc.next(options);
	}
	public addOption(option: string): void {
		const options: string[] = this.optionsSrc.getValue();
		options.unshift(option);
		this.optionsSrc.next(options);
	}
}
