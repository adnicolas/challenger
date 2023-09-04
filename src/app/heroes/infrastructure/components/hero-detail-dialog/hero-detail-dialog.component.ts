import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef
} from '@angular/material/dialog';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';
import { FormatColumnName } from '@shared/infrastructure/pipes/formatColumnName.pipe';

@Component({
	selector: 'challenger-hero-detail-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		ButtonComponent,
		FormatColumnName
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
