import { Injectable } from '@angular/core';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { ChipsService } from '@heroes/domain/ChipsService';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomainHeroService } from '@heroes/domain/DomainHeroService';

@Injectable()
export class RxJsChipsService implements ChipsService {
	private optionsSrc: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
		[],
	);
	public options$: Observable<string[]> = this.optionsSrc.asObservable();
	constructor(private domainHeroService: DomainHeroService) {}
	public setOptions(heroes: MarvelHero[]): void {
		const options: string[] = heroes.map((hero: MarvelHero) =>
			this.domainHeroService.getHeroName(hero),
		);
		this.optionsSrc.next(options);
	}
}
