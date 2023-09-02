import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../button/button.component';
import { MatInputModule } from '@angular/material/input';
import { CreateHero } from '@application/CreateHero';
import { MatSelectModule } from '@angular/material/select';
import {
	FormControl,
	Validators,
	FormsModule,
	ReactiveFormsModule,
	FormGroup
} from '@angular/forms';

@Component({
	selector: 'challenger-creation-dialog',
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
	templateUrl: './creation-dialog.component.html',
	styles: []
})
export class CreationDialogComponent {
	public creationForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		citizenship: new FormControl('', [Validators.required]),
		creator: new FormControl('', [Validators.required]),
		skills: new FormControl('', [Validators.required]),
		occupation: new FormControl('', [Validators.required]),
		memberOf: new FormControl('', [Validators.required])
	});

	constructor(public dialogRef: MatDialogRef<unknown>) {}
	public close(): void {
		this.dialogRef.close();
	}
	public save(): void {
		new CreateHero().run();
	}
}
