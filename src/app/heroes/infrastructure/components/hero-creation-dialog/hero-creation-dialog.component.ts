import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateHero } from '@heroes/application/CreateHero';
import { Gender } from '@heroes/domain/Gender.enum';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { RxJsHeroesStateService } from '@heroes/infrastructure/services/RxJsHeroesStateService';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';

@Component({
	selector: 'challenger-hero-creation-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		ButtonComponent,
		MatInputModule,
		FormsModule,
		MatSelectModule,
		ReactiveFormsModule
	],
	providers: [{ provide: HeroesStateService, useClass: RxJsHeroesStateService }],
	templateUrl: './hero-creation-dialog.component.html',
	styleUrls: ['./hero-creation-dialog.component.scss']
})
export class HeroCreationDialogComponent {
	public genderEnum = Gender;

	public creationForm = new FormGroup({
		nameLabel: new FormControl('', [Validators.required]),
		citizenshipLabel: new FormControl('', [Validators.required]),
		creatorLabel: new FormControl('', [Validators.required]),
		skillsLabel: new FormControl('', [Validators.required]),
		occupationLabel: new FormControl('', [Validators.required]),
		memberOfLabel: new FormControl('', [Validators.required]),
		genderLabel: new FormControl(Gender.MALE, [Validators.required])
	});

	constructor(
		public dialogRef: MatDialogRef<unknown>,
		@Inject(MAT_DIALOG_DATA) private data: HeroesStateService,
	) {}
	public close(): void {
		this.dialogRef.close();
	}
	public save(): void {
		new CreateHero(this.data).run(this.creationForm.value as MarvelHero);
		this.close();
	}
}
