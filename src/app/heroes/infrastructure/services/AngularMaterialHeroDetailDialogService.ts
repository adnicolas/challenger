import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailDialogService } from '@heroes/domain/HeroDetailDialogService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
// eslint-disable-next-line max-len
import { HeroDetailDialogComponent } from '@heroes/infrastructure/components/hero-detail-dialog/hero-detail-dialog.component';

@Injectable()
export class AngularMaterialHeroDetailDialogService
implements HeroDetailDialogService {
	constructor(public dialog: MatDialog) {}
	public open(hero: MarvelHero) {
		this.dialog.open(HeroDetailDialogComponent, {
			data: hero
		});
	}
}
