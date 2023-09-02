import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailDialogService } from '@domain/HeroDetailDialogService';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { DetailDialogComponent } from '@infrastructure/components/detail-dialog/detail-dialog.component';

@Injectable()
export class AngularMaterialHeroDetailDialogService
implements HeroDetailDialogService {
	constructor(public dialog: MatDialog) {}
	public open(hero: MarvelHero) {
		this.dialog.open(DetailDialogComponent, {
			data: hero
		});
	}
}
