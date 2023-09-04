import { Injectable } from '@angular/core';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

@Injectable({
	providedIn: 'root'
})
export class DomainHeroService {
	public getHeroName(hero: MarvelHero): string {
		return hero.nameLabel;
	}
}
