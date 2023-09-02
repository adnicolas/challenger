import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'challenger-root',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './app.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'challenger';
}
