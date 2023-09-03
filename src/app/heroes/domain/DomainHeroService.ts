import { Injectable } from '@angular/core';
import { MarvelHero } from './MarvelHero.interface';

@Injectable({
	providedIn: 'root'
})
export class DomainHeroService {
	public getHeroName(hero: MarvelHero): string {
		return hero.nameLabel;
	}
}
