import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';
// eslint-disable-next-line max-len
import { HeroCreationDialogComponent } from '@heroes/infrastructure/components/hero-creation-dialog/hero-creation-dialog.component';

@Injectable()
export class AngularMaterialHeroCreationDialogService
implements HeroCreationDialogService {
	constructor(public dialog: MatDialog) {}
	public open() {
		this.dialog.open(HeroCreationDialogComponent);
	}
}
