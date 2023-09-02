import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroCreationDialogService } from '@domain/HeroCreationDialogService';
import { CreationDialogComponent } from '@infrastructure/components/creation-dialog/creation-dialog.component';

@Injectable()
export class AngularMaterialHeroCreationDialogService
implements HeroCreationDialogService {
	constructor(public dialog: MatDialog) {}
	public open() {
		this.dialog.open(CreationDialogComponent);
	}
}
