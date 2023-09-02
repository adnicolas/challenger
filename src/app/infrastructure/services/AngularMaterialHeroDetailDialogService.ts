import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailDialogService } from '@domain/HeroDetailDialogService';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { DialogComponent } from '@infrastructure/components/dialog/dialog.component';

@Injectable()
export class AngularMaterialHeroDetailDialogService
implements HeroDetailDialogService {
	constructor(public dialog: MatDialog) {}
	public open(hero: MarvelHero) {
		this.dialog.open(DialogComponent, {
			data: hero
		});
	}
}
