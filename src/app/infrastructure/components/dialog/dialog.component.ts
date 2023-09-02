import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogModule
} from '@angular/material/dialog';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { ButtonComponent } from '../button/button.component';

@Component({
	selector: 'challenger-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		ButtonComponent
	],
	templateUrl: './dialog.component.html',
	styles: []
})
export class DialogComponent {
	constructor(
		public dialogRef: MatDialogRef<unknown>,
		@Inject(MAT_DIALOG_DATA) public data: MarvelHero,
	) {}
	public close(): void {
		this.dialogRef.close();
	}
}
