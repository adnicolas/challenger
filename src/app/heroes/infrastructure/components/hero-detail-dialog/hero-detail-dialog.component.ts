import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogModule
} from '@angular/material/dialog';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';

@Component({
	selector: 'challenger-hero-detail-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		ButtonComponent
	],
	templateUrl: './hero-detail-dialog.component.html',
	styleUrls: ['./hero-detail-dialog.component.scss']
})
export class HeroDetailDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<unknown>,
		@Inject(MAT_DIALOG_DATA) public data: MarvelHero,
	) {}
	public close(): void {
		this.dialogRef.close();
	}
}
