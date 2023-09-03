import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
// eslint-disable-next-line max-len
import { HeroCreationDialogComponent } from '@heroes/infrastructure/components/hero-creation-dialog/hero-creation-dialog.component';

@Injectable()
export class AngularMaterialHeroCreationDialogService
implements HeroCreationDialogService {
	constructor(public dialog: MatDialog) {}
	public open(stateService: HeroesStateService) {
		this.dialog.open(HeroCreationDialogComponent, {
			data: stateService
		});
	}
}
